<template>
  <div v-if="loading" class="col-span-3 flex justify-center items-center py-10">
    <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
  </div>
  <div v-else class="flex gap-4 flex-col md:flex-row justify-between p-4 bg-white rounded-lg">
    <!-- Left section -->
    <div class="md:w-1/2 p-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-lg">
      <div class="flex items-center mb-4 gap-4">
        <img v-if="poll.image" :src="poll.image" class="w-20 h-20 object-cover rounded" />
        <div>
          <h2 class="text-xl font-bold">{{ poll.title }}</h2>
        </div>
      </div>

      <div class="mb-4">
        <p class="text-xl font-bold mb-2 text-red-900">Current Results:</p>
        <div v-for="result in results" :key="result.id" class="grid grid-cols-[0.3fr_1fr] mb-2">
          <p class="w-full font-bold">{{ result.name }}:</p>
          <div class="flex justify-center items-center">
            <div class="flex-grow bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div class="bg-red-500 h-2.5" :style="{ width: result.percentage + '%' }"></div>
            </div>
            <p class="ml-2">{{ result.percentage }}%</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Right section -->
    <div class="md:w-1/2 p-4 rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <h3 class="text-xl font-bold mb-4">{{ users.length }} Votes</h3>
      <ul class="overflow-y-auto h-64">
        <li v-for="(user, index) in users" :key="index" class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <img src="../../assets/images/HomePage/defaultav.png" alt="User Avatar" class="w-8 h-8 rounded-full mr-2" />
            <p>{{ user.name }}</p>
          </div>
          <p class="font-bold">{{ user.vote }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { loadAllPollTest } from "../../apollo";

export default {
  name: "Candidates",

  setup() {
    const users = ref([]);
    const results = ref([]);
    const voted = ref([]);
    const contestants = ref([]);
    const poll = ref({});
    const loading = ref(true);
    const dataLoaded = ref({ contestants: false, votes: false, poll: false });

    const route = useRoute();
    const campaignId = route.params.id;

    const dispatch = (action) => {
      switch (action.type) {
        case "POLL_CONTESTANTADDEDS_LOADED":
          contestants.value = action.contestantAddeds.filter(c => c.pollId === campaignId);
          dataLoaded.value.contestants = true;
          checkAllDataLoaded();
          break;
        case "VOTED_LOADED":
          voted.value = action.voteds.filter(vote => vote.pollId === campaignId); // Filter votes by campaignId
          dataLoaded.value.votes = true;
          updateResults();
          checkAllDataLoaded();
          break;
        case "POLL_CREATED_LOADED":
          const loadedPoll = action.pollCreateds.find(p => p.Contract_id === campaignId);
          if (loadedPoll) {
            poll.value = loadedPoll;
          }
          dataLoaded.value.poll = true;
          checkAllDataLoaded();
          break;
        default:
          break;
      }
    };

    const checkAllDataLoaded = () => {
      if (dataLoaded.value.contestants && dataLoaded.value.votes && dataLoaded.value.poll) {
        loading.value = false; // All data loaded, stop the spinner
      }
    };

    const updateResults = () => {
      const voteCounts = {};
      const contestantDetails = {};

      contestants.value.forEach(contestant => {
        voteCounts[contestant.contestantId] = 0;
        contestantDetails[contestant.contestantId] = contestant.name;
      });

      voted.value.forEach(vote => {
        if (voteCounts[vote.contestantId] !== undefined) {
          voteCounts[vote.contestantId]++;
        }
      });

      const totalVotes = voted.value.length;
      results.value = Object.keys(voteCounts).map(id => {
        const name = contestantDetails[id];
        const count = voteCounts[id];
        const percentage = totalVotes ? ((count / totalVotes) * 100).toFixed(1) : 0;
        return { id, name, percentage };
      });

      users.value = voted.value.map(vote => ({
        name: vote.voter,
        avatar: "../../assets/images/HomePage/defaultav.png",
        vote: contestantDetails[vote.contestantId]
      }));
    };

    onMounted(() => {
      loadAllPollTest(dispatch);
    });

    return {
      users,
      results,
      contestants,
      voted,
      poll,
      loading
    };
  }
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
