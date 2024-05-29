<template>
  <div class="bg-white min-h-screen rounded-xl p-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
    <div class="flex justify-between py-5">
      <span class="w-[170px]"></span>
      <span class="flex justify-center text-red-900 font-bold text-2xl">Contestants</span>
      <div @click="showPopup = true" class="py-2 px-4 bg-blue-600 text-white rounded flex justify-end items-center gap-2 cursor-pointer">
        <i class="fa-solid fa-plus"></i>
        <span class="">Add Contestants</span>
      </div>
    </div>

    <div class="flex justify-between py-6">
      <div class="flex gap-4">
        <span class="text-gray-500 font-semibold">Start Date:</span>
        <span class="font-semibold">{{ formatDate(startDate) }}</span>
      </div>
      <div class="flex gap-4">
        <span class="text-gray-500 font-semibold">End Date:</span>
        <span class="font-semibold">{{ formatDate(endDate) }}</span>
      </div>
    </div>

    <!-- Spinner -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
    </div>

    <!-- No Contestants Message -->
    <div v-else-if="contestants.length === 0" class="flex flex-col justify-center items-center py-10">
      <img class="w-[400px] h-[400px] object-cover opacity-50" src="../../../assets/images/profile/nopoll2.png" alt="">
      <span class="text-gray-300 text-3xl font-bold">No contestants available.</span>
    </div>

    <!-- Contestants List -->
    <div v-else class="grid grid-cols-2 gap-6">
      <div v-for="contestant in contestants" :key="contestant.contestantId" class="grid grid-cols-2 gap-2">
        <div class="bg-white rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <img class="w-full h-[200px] rounded-lg transition duration-300 ease-in-out" :src="contestant.image" alt="" />
        </div>
        <div class="flex flex-col justify-between p-4 bg-white rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <div class="flex flex-col gap-2">
            <span class="flex justify-center font-bold text-xl">{{ contestant.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <button @click="changeContent('MyCampaignsProfile')" type="submit" class="px-4 py-2 bg-gray-600 hover:opacity-75 text-white rounded">Back</button>
      <button @click="changeContent('MyCampaignsProfile')" type="submit" class="px-4 py-2 bg-blue-900 hover:opacity-75 text-white rounded">Done</button>
    </div>

    <!-- Popup form -->
    <div v-if="showPopup" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg p-6 w-1/3">
        <div class="flex justify-between items-center pb-4">
          <h3 class="text-xl font-semibold">Add Contestant</h3>
          <button @click="showPopup = false" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <form @submit.prevent="addContestant">
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Name</label>
            <input type="text" id="name" v-model="newContestant.name" class="w-full mt-2 p-2 border rounded focus:out">
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700">Description</label>
            <textarea id="description" v-model="newContestant.description" class="w-full mt-2 p-2 border rounded focus:out"></textarea>
          </div>
          <div class="mb-4">
            <label for="image" class="block text-gray-700">Image URL</label>
            <input type="text" id="image" v-model="newContestant.image" class="w-full mt-2 p-2 border rounded focus:out">
          </div>
          <div class="flex justify-end gap-2">
            <button @click="showPopup = false" type="button" class="px-4 py-2 bg-gray-600 hover:opacity-75 text-white rounded">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 hover:opacity-75 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Processing Popup -->
    <div v-if="updateProcessing || updateSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
      <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div v-if="!updateSuccess" class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
          <span class="ml-4">Adding in progress...</span>
        </div>
        <div v-else class="w-[200px] h-[100px] flex flex-col gap-4 justify-center items-center">
          <i class="fa-solid fa-circle-check text-green-500 font-bold text-xl"></i>
          <span class="text-green-500 font-bold text-xl">Added Successfully</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { contest } from '../../../clientFunctions'; // Import contest function
import { loadAllPollTest } from '../../../apollo';

export default {
  name: "ContestantsCampaigns",
  props: {
    pollId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentContent: "CreateCampaignsProfile",
      showPopup: false,
      newContestant: {
        name: "",
        description: "",
        image: ""
      },
      contestants: [],
      loading: true,
      startDate: null,
      endDate: null,
      updateProcessing: false, // New data property for processing state
      updateSuccess: false, // New data property for success state
    };
  },
  methods: {
    changeContent(newContent) {
      this.currentContent = newContent;
      this.$emit("changeContent", newContent); // Emit event when content changes
    },
    async addContestant() {
      this.updateProcessing = true;
      this.updateSuccess = false;
      try {
        const { name, description, image } = this.newContestant;
        await contest(this.pollId, name, image); // Call the contest function with pollId
        console.log('Contestant added successfully');
        this.updateSuccess = true; // Set success state to true
        this.loadContestants(); // Reload contestants after adding a new one
        setTimeout(() => {
          this.updateSuccess = false;
        }, 2000); // Hide success message after 2 seconds
      } catch (error) {
        console.error('Error adding contestant:', error);
      } finally {
        this.updateProcessing = false;
        // After successful addition, close popup and reset form
        this.showPopup = false;
        this.newContestant = { name: "", description: "", image: "" };
      }
    },
    dispatchPolls(action) {
      switch (action.type) {
        case "POLL_CONTESTANTADDEDS_LOADED":
          this.contestants = action.contestantAddeds.filter(c => c.pollId === this.pollId);
          this.loading = false;
          break;
        case "POLL_CREATED_LOADED":
          const poll = action.pollCreateds.find(p => p.Contract_id === this.pollId);
          if (poll) {
            this.startDate = poll.startsAt;
            this.endDate = poll.endsAt;
          }
          break;
        default:
          break;
      }
    },
    loadContestants() {
      this.loading = true;
      loadAllPollTest(this.dispatchPolls);
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    }
  },
  mounted() {
    this.loadContestants(); // Fetch contestants when component mounts
  }
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
