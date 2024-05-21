<template>
  <div>
    <div v-if="loading" class="col-span-3 flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
    </div>
    <div v-else>
      <span class="font-bold text-xl">Description</span>
      <div v-if="poll" class="p-6 mb-6 mt-4 border rounded-md bg-blue-200 border-blue-900">

        <span class="text-blue-900 font-bold">
          {{ poll.description }}
        </span>
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
            <span class="flex justify-center w-full cursor-pointer items-center py-2 px-4 rounded-md bg-blue-900 text-white hover:opacity-70">Vote</span>
            <div class="flex justify-center items-center gap-2">
              <i class="fa-solid fa-arrow-up bg-blue-200 p-2 rounded-lg text-blue-900"></i>
              <span class="text-blue-900 font-bold">5</span>
              <span class="text-blue-900 font-bold">vote</span>
            </div>
          </div>
        </div>
      </div>
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
    const polls = ref([]);
    const contestants = ref([]);
    const poll = ref(null);
    const loading = ref(true);

    const route = useRoute();
    const campaignId = route.params.id;

    const dispatch = (action) => {
      switch (action.type) {
        case "POLL_CREATED_LOADED":
          polls.value = action.pollCreateds;
          poll.value = polls.value.find(p => p.DappContract_id === campaignId);
          loading.value = false;
          break;
        case "POLL_CONTESTANTADDEDS_LOADED":
          contestants.value = action.contestantAddeds.filter(c => c.pollId === campaignId);
          break;
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
      poll,
      contestants,
      formatDate,
      loading,
    };
  },
};
</script>

<style scoped>
/* Thêm style nếu cần thiết */
</style>
