<template>
  <div>
    <div class="min-h-[450px] bg-cover bg-center object-cover bg-[url('https://caltechsites-prod.s3.amazonaws.com/scienceexchange/images/Vote_redblue2_LoRes_sttntNm.2e16d0ba.fill-1600x500-c100.jpg')]">
      <div class="inset-0 min-h-[450px] bg-black bg-opacity-50">
        <div class="min-h-[450px] mx-auto desktop:w-[1400px] max-sm:w-full desktop:px-0 flex justify-center items-center">
          <div class="flex flex-col gap-4 text-white">
            <span class="font-bold text-5xl">Campaign</span>
            <span class="text-center font-bold">Home / Campaign</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto desktop:w-[1400px] max-sm:w-full desktop:px-0">
      <div class="flex justify-between py-4 items-center">
        <div class="flex gap-3">
          <div class="flex gap-2">
            <input class="cursor-pointer" type="radio" id="active" name="status">
            <label class="font-semibold" for="active">Active</label>
          </div>
          <div class="flex gap-2">
            <input class="cursor-pointer" type="radio" id="voted" name="status">
            <label class="font-semibold" for="voted">Voted</label>
          </div>
          <div class="flex gap-2">
            <input class="cursor-pointer" type="radio" id="ended" name="status">
            <label class="font-semibold" for="ended">Ended</label>
          </div>
          <div class="flex gap-2">
            <input class="cursor-pointer" type="radio" id="all" name="status">
            <label class="font-semibold" for="all">All</label>
          </div>
        </div>
      </div>
      <div v-if="loading" class="col-span-3 flex justify-center items-center py-10">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
      <div v-else  class="grid grid-cols-3 gap-6 py-4">
        <div v-for="poll in polls" :key="poll.id" class="bg-white rounded-lg shadow-lg">
          <img class="w-full h-[250px] rounded-t-lg" :src="poll.image || 'default-image-url'" alt="" />
          <div class="flex flex-col p-4 gap-2">
            <span class="font-bold text-red-900 text-2xl mb-4 line-clamp-1">{{ poll.title }}</span>
            <span class="text-sm text-gray-500 border-b mb-4 line-clamp-3 font-semibold">{{ poll.description }}</span>
            <div class="flex justify-between border-b pb-2">
              <span class="text-sm text-gray-500">Expired time:</span>
              <span class="text-sm text-gray-500 font-semibold">{{ formatDate(poll.endsAt) }}</span>
            </div>
            <div class="flex justify-between pb-4">
              <span class="text-sm text-gray-500">Status:</span>
              <span class="text-sm px-4 py-1 text-green-500 border border-green-400 bg-green-100 rounded-2xl font-semibold">Active</span>
            </div>
            <a :href="`/campaign/details/${poll.DappContract_id}`" class="py-3 w-full hover:text-white hover:opacity-75 transition duration-300 ease-in-out cursor-pointer flex justify-center rounded-2xl text-sm items-center text-white bg-red-900 px-2">
              <span class="font-bold">View Campaign</span>
            </a>
          </div>
        </div>
      </div>
      <div v-if="!loading" class="flex justify-center">
        <span class="w-[200px] text-center bg-red-900 rounded-lg px-2 py-3 my-4 text-white cursor-pointer font-bold hover:bg-red-300 hover:text-red-900 border border-red-900">Load more</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { loadAllPollTest } from '../../apollo';

export default {
  setup() {
    const polls = ref([]);
    const loading = ref(true);

    const dispatch = (action) => {
      switch (action.type) {
        case 'POLL_CREATED_LOADED':
          polls.value = action.pollCreateds;
          loading.value = false;
          break;
        // Bạn có thể thêm các case khác ở đây nếu cần thiết
      }
    };

    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    };

    onMounted(() => {
      loadAllPollTest(dispatch);
    });

    return {
      polls,
      loading,
      formatDate,
    };
  },
};
</script>

<style scoped>
/* Thêm style nếu cần thiết */
</style>
