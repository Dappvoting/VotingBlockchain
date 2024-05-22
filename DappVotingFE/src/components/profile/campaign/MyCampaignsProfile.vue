<template>
  <div class="w-full bg-white min-h-screen rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-6">
    <div class="flex justify-between items-center py-5">
      <div class="w-[130px]">
        <span></span>
      </div>
      <span class="flex justify-center text-red-900 font-bold text-2xl">My Campaign</span>
      <div
        @click="changeContent('CreateCampaignsProfile')"
        class="px-3 py-2 rounded text-white bg-blue-600 flex gap-2 justify-center items-center cursor-pointer"
      >
        <span>New Campaign</span>
      </div>
    </div>

    <!-- Spinner -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
    </div>

    <!-- No Polls Message -->
    <div v-else-if="filteredPolls.length === 0" class="flex flex-col justify-center items-center py-10">
      <img class="w-[400px] h-[400px] object-cover opacity-50" src="../../../assets/images/profile/nopoll2.png" alt="">
      <span class="text-gray-300 text-3xl font-bold">No campaign available.</span>
    </div>

    <!-- Polls List -->
    <div v-else class="grid grid-cols-3 gap-6 py-4">
      <div v-for="poll in filteredPolls" :key="poll.id" class="bg-white rounded-lg shadow-lg">
        <img class="w-full h-[200px] rounded-t-lg" :src="poll.image" alt="" />
        <div class="flex flex-col p-4 gap-2">
          <span class="font-bold text-red-900 text-2xl mb-2 line-clamp-1">{{ poll.title }}</span>
          <span class="text-sm text-gray-500 mb-4 line-clamp-3 font-semibold min-h-[60px]">{{ poll.description }}</span>
          <div class="flex justify-between border-b pb-2">
            <span class="text-sm text-gray-500">Expired time:</span>
            <span class="text-sm text-gray-500 font-semibold">{{ formatDate(poll.endsAt) }}</span>
          </div>
          <div class="flex justify-between pb-4">
            <span class="text-sm text-gray-500">Status:</span>
            <span class="text-sm px-4 py-1 text-green-500 border border-green-400 bg-green-100 rounded-2xl font-semibold">Actived</span>
          </div>
          <div class="flex gap-1 justify-center items-center">

              <a
              :href="'/campaign/details/' + poll.Contract_id"
              class="py-3 w-full hover:text-white hover:opacity-75 transition duration-300 ease-in-out cursor-pointer flex justify-center rounded-lg text-sm items-center text-white bg-red-900 px-2"
            >
              <span class="font-bold ">View Campaign</span>
              </a>
              <button @click="addContest(poll.Contract_id)" class="py-3 w-full hover:text-white hover:opacity-75 transition duration-300 ease-in-out cursor-pointer flex justify-center rounded-lg text-sm items-center text-white bg-blue-900 px-2 gap-2 font-bold">
                <i class="fa-solid fa-plus"></i>
                <span>Contest</span>
              </button>


            <i class="fa-solid fa-pen-to-square hover:opacity-75 text-red-900 text-2xl cursor-pointer"></i>
            <i class="fa-solid fa-trash-can hover:opacity-75 text-red-900 text-2xl cursor-pointer"></i>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { loadAllPollTest } from '../../../apollo';

export default {
  name: "Dashboard",
  data() {
    return {
      currentContent: "InformationProfile", // Mặc định hiển thị Dashboards
      polls: [], // To store all polls
      walletAddress: localStorage.getItem('walletAddress'), // Get wallet address from localStorage
      loading: true, // State to track loading
    };
  },
  computed: {
    filteredPolls() {
      // Filter polls by director (wallet address)
      return this.polls.filter(poll => poll.director.toLowerCase() === this.walletAddress.toLowerCase());
    }
  },
  methods: {
    changeContent(newContent) {
      this.currentContent = newContent;
      this.$emit("changeContent", newContent); // Phát ra sự kiện khi nội dung thay đổi
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    },
    fetchPolls() {
      loadAllPollTest(this.dispatchPolls);
    },
    dispatchPolls(action) {
      if (action.type === "POLL_CREATED_LOADED") {
        this.polls = action.pollCreateds;
        this.loading = false; // Data loaded, stop the spinner
      }
    },
    addContest(pollId) {
      // Chuyển qua trang ContestantsCampaigns và truyền pollId
      this.$emit('changeContent', 'ContestantsCampaigns', { pollId });
    }
  },
  mounted() {
    this.fetchPolls(); // Fetch polls when component mounts
  }
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
