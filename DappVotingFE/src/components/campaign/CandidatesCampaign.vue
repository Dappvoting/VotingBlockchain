<template>
  <div>
    <div v-if="loading" class="col-span-3 flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
    </div>
    <div v-else>
      <span class="font-bold text-xl">Description</span>
      <div v-if="poll" class="p-6 mb-6 mt-4 border rounded-md bg-blue-200 border-blue-900">
        <span class="text-blue-900 font-bold">{{ poll.description }}</span>
      </div>
      <div v-if="poll" class="flex justify-between pb-4">
        <div class="flex gap-4">
          <span class="text-gray-500 font-semibold">Start Date:</span>
          <span class="font-semibold">{{ formatDate(poll.startsAt) }}</span>
        </div>
        <div class="flex gap-4">
          <span class="text-gray-500 font-semibold">End Date:</span>
          <span class="font-semibold">{{ formatDate(poll.endsAt) }}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-10">
        <div v-for="contestant in contestants" :key="contestant.id" class="grid grid-cols-2 gap-2">
          <div class="bg-white rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img class="w-full h-[200px] rounded-lg transition duration-300 ease-in-out object-cover" :src="contestant.image" alt="" />
          </div>
          <div class="flex flex-col justify-between p-4 bg-white rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <div class="flex flex-col gap-2">
              <span class="flex justify-center font-bold text-xl">{{ contestant.name }}</span>
            </div>
            <span @click="handleVote(contestant.contestantId)" class="flex justify-center w-full cursor-pointer items-center py-2 px-4 rounded-md bg-blue-900 text-white hover:opacity-70">Vote</span>
            <div class="flex justify-center items-center gap-2">
              <i class="fa-solid fa-arrow-up bg-blue-200 p-2 rounded-lg text-blue-900"></i>
              <span class="text-blue-900 font-bold">{{ contestant.votes }}</span>
              <span class="text-blue-900 font-bold">votes</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Modal -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-8 rounded-md shadow-md text-center flex justify-center items-center">
        <div v-if="!voteSuccess" class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
          <span class="ml-4">Voting in progress...</span>
        </div>
        <div v-else class="w-[200px] h-[100px] flex flex-col gap-4 justify-center items-center">
          <i class="fa-solid fa-circle-check text-green-500 font-bold text-xl"></i>
          <span class="text-green-500 font-bold text-xl">Voted Successfully</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { loadAllPollTest } from "../../apollo";
import { vote } from "../../clientFunctions"; // Đường dẫn tới file clientFunctions.js

export default {
  name: "Candidates",

  setup() {
    const polls = ref([]);
    const contestants = ref([]);
    const voted = ref([]);
    const poll = ref(null);
    const loading = ref(true);
    const showPopup = ref(false);
    const voteSuccess = ref(false);

    const route = useRoute();
    const campaignId = route.params.id;

    const dataLoaded = ref({ polls: false, contestants: false, votes: false });

    const dispatch = (action) => {
      switch (action.type) {
        case "POLL_CREATED_LOADED":
          polls.value = action.pollCreateds;
          poll.value = polls.value.find((p) => p.Contract_id === campaignId);
          dataLoaded.value.polls = true;
          checkAllDataLoaded();
          break;
        case "POLL_CONTESTANTADDEDS_LOADED":
          contestants.value = action.contestantAddeds.filter((c) => c.pollId === campaignId);
          // Initialize vote counts
          contestants.value.forEach((c) => {
            c.votes = 0;
          });
          dataLoaded.value.contestants = true;
          checkAllDataLoaded();
          break;
        case "VOTED_LOADED":
          voted.value = action.voteds;
          dataLoaded.value.votes = true;
          updateVotes();
          checkAllDataLoaded();
          break;
      }
    };

    const checkAllDataLoaded = () => {
      if (dataLoaded.value.polls && dataLoaded.value.contestants && dataLoaded.value.votes) {
        loading.value = false;
      }
    };

    const updateVotes = () => {
      // Reset votes
      contestants.value.forEach((c) => {
        c.votes = 0;
      });

      // Tally votes from voted array
      voted.value.forEach((vote) => {
        const contestant = contestants.value.find((c) => c.contestantId == vote.contestantId);
        if (contestant) {
          contestant.votes += 1;
        }
      });
    };

    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    };

    const handleVote = async (contestantId) => {
      try {
        showPopup.value = true;
        voteSuccess.value = false;

        if (isNaN(contestantId)) {
          throw new Error("Invalid contestant ID");
        }

        console.log(parseInt(campaignId), parseInt(contestantId));
        await vote(parseInt(campaignId), parseInt(contestantId));
        voteSuccess.value = true;
        setTimeout(() => {
          showPopup.value = false;
        }, 1000);
      } catch (error) {
        console.error("Error casting vote:", error);
        showPopup.value = false;
      }
    };

    onMounted(() => {
      loadAllPollTest(dispatch);
    });

    watch(voted, updateVotes);

    return {
      poll,
      contestants,
      formatDate,
      loading,
      handleVote,
      showPopup,
      voteSuccess,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
