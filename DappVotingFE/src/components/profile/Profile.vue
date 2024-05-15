<template>
  <div
    class="grid grid-cols-[400px_1fr] h-screen py-5 desktop:w-[1600px] max-sm:w-full desktop:px-0 mx-auto"
  >
    <!-- Sidebar -->
    <Sidebar @changeContent="changeContent"></Sidebar>

    <!-- Main Content -->
    <div class="flex flex-col pl-6">
      <InformationProfile v-if="content === 'InformationProfile'"></InformationProfile>
      <CreateCampaignsProfile v-if="content === 'CreateCampaignsProfile'"></CreateCampaignsProfile>
      <VotedCampaignsProfile v-if="content === 'VotedCampaignsProfile'"></VotedCampaignsProfile>

    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import InformationProfile from "./InformationProfile.vue";
import CreateCampaignsProfile from "./CreateCampaignsProfile.vue";
import VotedCampaignsProfile from "./VotedCampaignsProfile.vue";

export default {
  name: "Profile",
  components: {
    Sidebar,
    InformationProfile,
    CreateCampaignsProfile,
    VotedCampaignsProfile,
  },
  data() {
    return {
      content: "InformationProfile", // Mặc định hiển thị DashBoards
    };
  },
  methods: {
    changeContent(newContent) {
      this.content = newContent;
    },
  },
};
</script>
