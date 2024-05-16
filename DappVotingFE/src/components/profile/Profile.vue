<template>
  <div
    class="grid grid-cols-[400px_1fr] py-5 desktop:w-[1600px] max-sm:w-full desktop:px-0 mx-auto"
  >
    <!-- Sidebar -->
    <Sidebar @changeContent="changeContent"></Sidebar>

    <!-- Main Content -->
    <div class="flex flex-col pl-6">
      <InformationProfile v-if="content === 'InformationProfile'"></InformationProfile>
      <CreateCampaignsProfile @changeContent="changeContent" v-if="content === 'CreateCampaignsProfile'"></CreateCampaignsProfile>
      <VotedCampaignsProfile v-if="content === 'VotedCampaignsProfile'"></VotedCampaignsProfile>
      <MyCampaignsProfile @changeContent="changeContent" v-if="content === 'MyCampaignsProfile'"></MyCampaignsProfile>
      <ContestantsCampaigns @changeContent="changeContent" v-if="content === 'ContestantsCampaigns'"></ContestantsCampaigns>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import InformationProfile from "./InformationProfile.vue";
import CreateCampaignsProfile from "./campaign/CreateCampaignsProfile.vue";
import VotedCampaignsProfile from "./VotedCampaignsProfile.vue";
import MyCampaignsProfile from "./campaign/MyCampaignsProfile.vue";
import ContestantsCampaigns from "./campaign/ContestantsCampaigns.vue";

export default {
  name: "Profile",
  components: {
    Sidebar,
    InformationProfile,
    CreateCampaignsProfile,
    VotedCampaignsProfile,
    MyCampaignsProfile,
    ContestantsCampaigns
  },
  data() {
    return {
      content: "InformationProfile",
    };
  },
  methods: {
    changeContent(newContent) {
      this.content = newContent;
    },
  },
};
</script>
