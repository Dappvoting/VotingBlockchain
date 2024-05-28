<template>
  <div>
    <div
      class="min-h-[450px] bg-cover bg-center object-cover bg-[url('https://caltechsites-prod.s3.amazonaws.com/scienceexchange/images/Vote_redblue2_LoRes_sttntNm.2e16d0ba.fill-1600x500-c100.jpg')]"
      data-aos="fade-up"
    >
      <div class="inset-0 min-h-[450px] bg-black bg-opacity-50">
        <div
          class="min-h-[450px] mx-auto desktop:w-[1400px] max-sm:w-full desktop:px-0 flex justify-center items-center"
          data-aos="fade-up"
        >
          <div class="flex flex-col gap-4 text-white">
            <span class="font-bold text-5xl">Campaign</span>
            <span class="text-center font-bold">Home / Campaign</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto desktop:w-[1400px] max-sm:w-full desktop:px-0" data-aos="fade-up">
      <div class="flex justify-between py-4 items-center">
        <div class="flex gap-3">
          <div class="flex gap-2">
            <input class="cursor-pointer" type="radio" id="all" name="status" v-model="statusFilter" />
            <label class="font-semibold" for="all">All</label>
          </div>
          <div class="flex gap-2">
            <input class="cursor-pointer" type="radio" id="active" name="status" v-model="statusFilter" />
            <label class="font-semibold" for="active">Active</label>
          </div>
          <div class="flex gap-2">
            <input class="cursor-pointer" type="radio" id="voted" name="status" v-model="statusFilter" />
            <label class="font-semibold" for="voted">Voted</label>
          </div>
          <div class="flex gap-2">
            <input class="cursor-pointer" type="radio" id="ended" name="status" v-model="statusFilter" />
            <label class="font-semibold" for="ended">Ended</label>
          </div>
        </div>
      </div>
      <div v-if="loading" class="col-span-3 flex justify-center items-center py-10" data-aos="fade-up">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
      <div v-else class="grid grid-cols-3 gap-6 py-4">
        <div v-for="poll in filteredPolls" :key="poll.id" class="bg-white rounded-lg shadow-lg" data-aos="fade-up">
          <img
            class="w-full h-[250px] rounded-t-lg"
            :src="poll.image || 'default-image-url'"
            alt=""
          />
          <div class="flex flex-col p-4 gap-2">
            <span class="font-bold text-red-900 text-2xl mb-2 line-clamp-1">{{ poll.title }}</span>
            <span class="text-sm text-gray-500 mb-4 line-clamp-3 font-semibold min-h-[60px]">{{ poll.description }}</span>
            <div class="flex justify-between border-b pb-2">
              <span class="text-sm text-gray-500">Expired time:</span>
              <span class="text-sm text-gray-500 font-semibold">{{ formatDate(poll.endsAt) }}</span>
            </div>
            <div class="flex justify-between pb-4">
              <span class="text-sm text-gray-500">Status:</span>
              <span
                :class="{
                  'text-green-500 border-green-400 bg-green-100': poll.status === 'Active',
                  'text-yellow-500 border-yellow-400 bg-yellow-100': poll.status === 'Voted',
                  'text-red-500 border-red-400 bg-red-100': poll.status === 'Ended'
                }"
                class="text-sm px-4 py-1 border rounded-2xl font-semibold"
              >{{ poll.status }}</span>
            </div>
            <a
              :href="`/campaign/details/${poll.Contract_id}`"
              class="py-3 w-full hover:text-white hover:opacity-75 transition duration-300 ease-in-out cursor-pointer flex justify-center rounded-2xl text-sm items-center text-white bg-red-900 px-2"
            >
              <span class="font-bold">View Campaign</span>
            </a>
          </div>
        </div>
      </div>
      <div v-if="!loading" class="flex justify-center" data-aos="fade-up">
        <span
          class="w-[200px] text-center bg-red-900 rounded-lg px-2 py-3 my-4 text-white cursor-pointer font-bold hover:bg-red-300 hover:text-red-900 border border-red-900"
          @click="loadMore"
        >Load more</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { loadAllPollTest } from "../../apollo";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  setup() {
    const polls = ref([]);
    const loading = ref(true);
    const statusFilter = ref('all');
    const walletAddress = ref(localStorage.getItem('walletAddress'));
    const votedPolls = ref([]);
    const deletedPollIds = ref([]); // Thêm biến để theo dõi các poll đã xóa

    const dispatch = (action) => {
      switch (action.type) {
        case "POLL_UPDATEDS_LOADED":
          updatePolls(action.pollUpdateds);
          break;
        case "POLL_CREATED_LOADED":
          polls.value = action.pollCreateds.map(poll => {
            poll.status = 'Active'; // Mặc định tất cả là Active
            return poll;
          });
          updateStatus();
          break;
        case "VOTED_LOADED":
          votedPolls.value = action.voteds.filter(vote => vote.voter.toLowerCase() === walletAddress.value.toLowerCase());
          updateStatus();
          break;
        case "POLL_DELETEDS_LOADED":
          deletedPollIds.value = action.pollDeleteds.map(poll => poll.Contract_id);
          break;
        default:
          break;
      }
    };

    const updatePolls = (updatedPolls) => {
      updatedPolls.forEach((updatedPoll) => {
        const index = polls.value.findIndex(
          (poll) => poll.Contract_id === updatedPoll.Contract_id
        );
        if (index !== -1) {
          polls.value[index] = updatedPoll;
        }
      });

      loading.value = false;
    };

    const updateStatus = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      polls.value.forEach(poll => {
        if (votedPolls.value.find(vote => vote.pollId === poll.Contract_id)) {
          poll.status = 'Voted';
        } else if (poll.endsAt < currentTime) {
          poll.status = 'Ended';
        }
      });
    };

    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    };

    const loadMore = () => {
      // Hàm load thêm dữ liệu
    };

    const filteredPolls = computed(() => {
      const activePolls = polls.value.filter(poll => !deletedPollIds.value.includes(poll.Contract_id));
      if (statusFilter.value === 'all') return activePolls;
      return activePolls.filter(poll => poll.status.toLowerCase() === statusFilter.value);
    });

    onMounted(() => {
      loadAllPollTest(dispatch);
      AOS.init({
        duration: 800,
        once: true,
      });
    });

    return {
      polls,
      loading,
      statusFilter,
      filteredPolls,
      formatDate,
      loadMore
    };
  },
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
