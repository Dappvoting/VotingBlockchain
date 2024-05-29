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
          <div class="flex justify-between pb-2">
            <span class="text-sm text-gray-500">Visibility:</span>
            <span class="text-sm text-gray-500 font-semibold">{{ poll.isPublic ? 'public' : 'private' }}</span>
          </div>
          <!-- <div class="flex justify-between pb-4">
            <span class="text-sm text-gray-500">Status:</span>
            <span
              :class="{
                'text-green-500 border-green-400 bg-green-100': poll.status === 'Active',
                'text-yellow-500 border-yellow-400 bg-yellow-100': poll.status === 'Voted',
                'text-red-500 border-red-400 bg-red-100': poll.status === 'Ended'
              }"
              class="text-sm px-4 py-1 border rounded-2xl font-semibold"
            >{{ poll.status }}</span>
          </div> -->
          <div class="flex gap-1 justify-center items-center">
            <button 
              @click="checkAddContest(poll)" 
              class="py-3 w-full hover:text-white hover:opacity-75 transition duration-300 ease-in-out cursor-pointer flex justify-center rounded-lg text-sm items-center text-white bg-blue-900 px-2 gap-2 font-bold">
              <i class="fa-solid fa-plus"></i>
              <span>Contest</span>
            </button>
            <button 
              v-if="!poll.isPublic" 
              @click="goToAuthorizedVoters(poll.Contract_id)" 
              :disabled="poll.hasAuthorizedVoters" 
              :class="{'opacity-50 cursor-not-allowed': poll.hasAuthorizedVoters}" 
              class="py-3 w-full hover:text-white hover:opacity-75 transition duration-300 ease-in-out cursor-pointer flex justify-center rounded-lg text-sm items-center text-white bg-green-600 px-2 gap-2 font-bold"
              :title="poll.hasAuthorizedVoters ? 'This campaign has already added voters and cannot be edited.' : ''"
            >
              <i class="fa-solid fa-users"></i>
              <span>Add Voters</span>
            </button>
            <i @click="checkEditPoll(poll)" class="fa-solid fa-pen-to-square hover:opacity-75 text-red-900 text-2xl cursor-pointer"></i>
            <i @click="showDeletePopup(poll.Contract_id)" class="fa-solid fa-trash-can hover:opacity-75 text-red-900 text-2xl cursor-pointer"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Popup -->
    <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <p class="text-lg font-bold mb-4">Are you sure you want to delete this poll?</p>
        <div class="flex justify-end gap-4">
          <button @click="confirmDeletePoll" class="bg-red-500 text-white px-4 py-2 rounded-lg">Yes</button>
          <button @click="cancelDeletePoll" class="bg-gray-300 text-black px-4 py-2 rounded-lg">No</button>
        </div>
      </div>
    </div>

    <!-- Deleting Spinner and Success Message -->
    <div v-if="deleteProcessing || deleteSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div v-if="!deleteSuccess" class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
          <span class="ml-4">Deleting in progress...</span>
        </div>
        <div v-else class="w-[200px] h-[100px] flex flex-col gap-4 justify-center items-center">
          <i class="fa-solid fa-circle-check text-green-500 font-bold text-xl"></i>
          <span class="text-green-500 font-bold text-xl">Deleted Successfully</span>
        </div>
      </div>
    </div>

    <!-- Edit Disabled Popup -->
    <div v-if="showEditDisabledPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <p class="text-lg font-bold mb-4">This campaign has already received votes and cannot be edited.</p>
        <button @click="showEditDisabledPopup = false" class="bg-blue-600 text-white px-4 py-2 rounded-lg">OK</button>
      </div>
    </div>
    
    <!-- Add Contest Disabled Popup -->
    <div v-if="showAddContestDisabledPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <p class="text-lg font-bold mb-4">This campaign has already received votes and cannot be edited.</p>
        <button @click="showAddContestDisabledPopup = false" class="bg-blue-600 text-white px-4 py-2 rounded-lg">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { deletePoll } from '../../../clientFunctions'; 
import { loadAllPollTest } from '../../../apollo';

export default {
  name: "Dashboard",
  data() {
    return {
      currentContent: "InformationProfile",
      polls: [],
      walletAddress: localStorage.getItem('walletAddress'),
      loading: true,
      votedPolls: [],
      showDeleteConfirmation: false,
      deleteProcessing: false,
      deleteSuccess: false,
      showEditDisabledPopup: false,
      showAddContestDisabledPopup: false,
      pollToDelete: null,
      pollId: null,
      deletedPollIds: [],
      updatedPolls: [],
      authorizedVoters: []
    };
  },
  computed: {
    filteredPolls() {
      return this.polls.filter(poll => poll.director.toLowerCase() === this.walletAddress.toLowerCase() && !this.deletedPollIds.includes(poll.Contract_id));
    }
  },
  methods: {
    changeContent(newContent) {
      this.currentContent = newContent;
      this.$emit("changeContent", newContent);
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    },
    async fetchPolls() {
      this.loading = true;
      await Promise.all([
        loadAllPollTest(this.dispatchPolls),
        new Promise(resolve => setTimeout(resolve, 1000)) // Ensure async completion
      ]);
      this.loading = false;
    },
    dispatchPolls(action) {
      switch (action.type) {
        case "POLL_CREATED_LOADED":
          this.polls = action.pollCreateds.map(poll => {
            poll.status = 'Active';
            return poll;
          });
          break;
        case "VOTED_LOADED":
          this.votedPolls = action.voteds;
          console.log("VTTT",this.votedPolls)
          this.updatePollsWithVotes();
          break;
        case "POLL_DELETEDS_LOADED":
          this.deletedPollIds = action.pollDeleteds.map(poll => poll.Contract_id);
          break;
        case "POLL_UPDATEDS_LOADED":
          this.updatedPolls = action.pollUpdateds;
          break;
        case "AUTHORIZED_VOTERS_ADDED_LOADED":
          this.authorizedVoters = action.authorizedVotersAdded;
          break;
        default:
          break;
      }

      if (this.updatedPolls.length > 0) {
        this.updatePollData();
      }
      this.updateStatus();
      this.updateAuthorizedVotersStatus();
    },
    updatePollsWithVotes() {
      console.log("POLL",this.polls)
      console.log("Voted",this.votedPolls)

      this.polls.forEach(poll => {
        if (this.votedPolls.find(vote => vote.pollId === poll.Contract_id)) {
          poll.status = 'Voted';
          poll.hasVotes = true; // thêm cờ để kiểm tra trong `checkEditPoll` và `checkAddContest`
        } else {
          poll.hasVotes = false;
        }
      });
    },
    updateStatus() {
      const currentTime = Math.floor(Date.now() / 1000);
      this.polls.forEach(poll => {
        if (!poll.hasVotes && poll.endsAt < currentTime) {
          poll.status = 'Ended';
        }
      });
    },
    updatePollData() {
      this.polls = this.polls.map(poll => {
        const updatedPoll = this.updatedPolls.find(updPoll => updPoll.Contract_id === poll.Contract_id);
        return updatedPoll ? { ...poll, ...updatedPoll } : poll;
      });
    },
    updateAuthorizedVotersStatus() {
      this.polls = this.polls.map(poll => {
        const authorizedVoter = this.authorizedVoters.find(voter => voter.pollId === poll.Contract_id);
        poll.hasAuthorizedVoters = !!authorizedVoter;
        return poll;
      });
    },
    showDeletePopup(pollId) {
      this.pollToDelete = pollId;
      this.showDeleteConfirmation = true;
    },
    async confirmDeletePoll() {
      this.deleteProcessing = true;
      this.showDeleteConfirmation = false;
      try {
        await deletePoll(this.pollToDelete);
        this.polls = this.polls.filter(poll => poll.Contract_id !== this.pollToDelete);
        this.deletedPollIds.push(this.pollToDelete);
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteSuccess = false;
        }, 2000);
        console.log('Poll deleted successfully');
      } catch (error) {
        console.error('Error deleting poll:', error);
      } finally {
        this.deleteProcessing = false;
      }
    },
    cancelDeletePoll() {
      this.showDeleteConfirmation = false;
      this.pollToDelete = null;
    },
    checkAddContest(poll) {
      if (poll.hasVotes) {
        this.showAddContestDisabledPopup = true;
      } else {
        this.addContest(poll.Contract_id);
      }
    },
    addContest(pollId) {
      this.$emit('changeContent', 'ContestantsCampaigns', { pollId });
    },
    checkEditPoll(poll) {
      if (poll.hasVotes) {
        this.showEditDisabledPopup = true;
      } else {
        this.editPoll(poll.Contract_id);
      }
    },
    editPoll(pollId) {
      this.$emit('changeContent', 'UpdateCampaignsProfile', { pollId });
    },
    goToAuthorizedVoters(pollId) {
      this.$emit('changeContent', 'AuthorizedVoters', { pollId });
    }
  },
  async mounted() {
    await this.fetchPolls();
  }
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
