<template>
  <div class="min-h-[450px] bg-cover bg-center bg-[url('https://caltechsites-prod.s3.amazonaws.com/scienceexchange/images/Vote_redblue2_LoRes_sttntNm.2e16d0ba.fill-1600x500-c100.jpg')]">
    <div class="inset-0 min-h-[450px] bg-black bg-opacity-50">
        <div class="min-h-[450px] mx-auto desktop:w-[1400px] max-sm:w-full desktop:px-0 flex justify-center items-center">
            <div class="flex flex-col gap-4 text-white">
                <span class="font-bold text-5xl">Election of staff</span>
                <span class="text-center font-bold">Home / Campaign / Details</span>
            </div>
        </div>
    </div>
</div>
  <div class="mx-auto desktop:w-[1400px] max-sm:w-full desktop:px-0">
    <div class="my-4 bg-white p-4">
      <div class="flex justify-center font-semibold text-3xl py-2">
        Contestants
      </div>
      <div class="w-full grid grid-cols-2 text-center">
        <div
          :class="{
            'font-bold': activeTab === 'CandidatesCampaign',
            'border-b-2 border-red-900 text-red-900 ': activeTab === 'CandidatesCampaign',
            'border-b-2 border-b-2-black': activeTab === 'ResultsCampaign',
          }"
          class="text-lg py-2  cursor-pointer"
          @click="changeContent('CandidatesCampaign')"
        >
          Candidates
        </div>
        <div
          :class="{
            'font-bold': activeTab === 'ResultsCampaign',
            'border-b-2 border-red-900 text-red-900 ': activeTab === 'ResultsCampaign',
            'border-b-2 border-b-2-black': activeTab === 'CandidatesCampaign',
          }"
          class="text-lg py-2  cursor-pointer"
          @click="changeContent('ResultsCampaign')"
        >
          Results
        </div>
      </div>
      <div class="py-4">
        <CandidatesCampaign
          v-if="activeTab === 'CandidatesCampaign'"
        ></CandidatesCampaign>
        <ResultsCampaign
          v-if="activeTab === 'ResultsCampaign'"
        ></ResultsCampaign>
      </div>
    </div>
  </div>
</template>

<script>
import CandidatesCampaign from "./CandidatesCampaign.vue";
import ResultsCampaign from "./ResultsCampaign.vue";

export default {
  name: "App",
  components: {
    CandidatesCampaign,
    ResultsCampaign,
  },
  data() {
    return {
      activeTab: "CandidatesCampaign", // Mặc định tab đầu tiên được chọn
    };
  },
  computed: {
    activeTabComponent() {
      return this.activeTab === "CandidatesCampaign"
        ? CandidatesCampaign
        : ResultsCampaign;
    },
  },
  methods: {
    changeContent(newContent) {
      this.content = newContent;
      this.activeTab = newContent;
    },
  },
};
</script>
