<template>
  <div class="w-full bg-white h-screen rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-4">
    <span class="flex justify-center text-red-900 font-bold text-2xl py-5">History Voted</span>
    
    <!-- Spinner -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
    </div>
    
    <!-- No Votes Message -->
    <div v-else-if="filteredVotes.length === 0" class="flex flex-col justify-center items-center py-10">
      <img class="w-[400px] h-[400px] object-cover opacity-50" src="../../assets/images/profile/nopoll2.png" alt="">
      <span class="text-gray-300 text-3xl font-bold">You have not voted in any campaigns yet.</span>
    </div>
    
    <!-- Votes List -->
    <div v-else class="grid grid-cols-3 gap-6 py-4">
      <div v-for="vote in filteredVotes" :key="vote.id" class="bg-white rounded-lg shadow-lg">
        <img class="w-full h-[200px] rounded-t-lg" :src="vote.poll.image" alt="" />
        <div class="flex flex-col p-4 gap-2">
          <span class="font-bold text-red-900 mb-2 line-clamp-1">{{ vote.poll.title }}</span>
          <span class="text-sm text-gray-500 mb-4 line-clamp-3 font-semibold">{{ vote.poll.description }}</span>
          <div class="flex justify-between border-b pb-2">
            <span class="text-sm text-gray-500">Expired time:</span>
            <span class="text-sm text-gray-500 font-semibold">{{ formatDate(vote.poll.endsAt) }}</span>
          </div>
          <div class="flex justify-between pb-4">
            <span class="text-sm text-gray-500">Status:</span>
            <span class="text-sm px-4 py-1 text-yellow-500 border border-yellow-400 bg-yellow-100 rounded-2xl font-semibold">Voted</span>
          </div>
          <a :href="'/campaign/details/' + vote.poll.Contract_id" class="py-3 w-full hover:text-white hover:opacity-75 transition duration-300 ease-in-out cursor-pointer flex justify-center rounded-2xl text-sm items-center text-white bg-red-900 px-2">
            <span class="font-bold">View Campaign</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { loadAllPollTest } from '../../apollo';

export default {
  name: "HistoryVoted",
  data() {
    return {
      votes: [], // To store all votes
      polls: [], // To store all polls
      walletAddress: localStorage.getItem('walletAddress'), // Get wallet address from localStorage
      loading: true, // State to track loading
    };
  },
  computed: {
    filteredVotes() {
      // Filter votes by voter (wallet address)
      return this.votes.filter(vote => vote.voter.toLowerCase() === this.walletAddress.toLowerCase());
    }
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    },
    fetchVotes() {
      loadAllPollTest(this.dispatchData);
    },
    dispatchData(action) {
      switch (action.type) {
        case "VOTED_LOADED":
          this.votes = action.voteds;
          console.log(this.votes)
          this.fetchPolls();
          break;
        case "POLL_CREATED_LOADED":
          this.polls = action.pollCreateds;
          this.loading = false; // Data loaded, stop the spinner
          this.mapVotesToPolls();
          break;
        default:
          break;
      }
    },
    fetchPolls() {
      loadAllPollTest(this.dispatchData);
    },
    mapVotesToPolls() {
      // Map votes to their corresponding polls
      this.votes = this.votes.map(vote => {
        vote.poll = this.polls.find(poll => poll.Contract_id === vote.pollId);
        return vote;
      });
    }
  },
  mounted() {
    this.fetchVotes(); // Fetch votes when component mounts
  }
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
