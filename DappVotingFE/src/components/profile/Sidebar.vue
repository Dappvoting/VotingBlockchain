<template>
  <div class="w-full bg-white min-h-screen p-6 rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
    <div class="flex flex-col items-center">
      <img class="rounded-full w-24 h-24"
        src="../../assets/images/HomePage/defaultav.png"
        alt="Profile Picture" />
      <h2 class="mt-4 text-xl font-bold">{{ shortenedAddress }}</h2>
      <!-- <p class="text-gray-600">Level: <span class="text-purple-500">Platinum</span></p> -->
    </div>
    <nav class="mt-10">
      <ul>
        <li class="mb-2"
        @click="changeContent('InformationProfile')">
          <a href="#" class="flex items-center gap-1 p-3 text-gray-700 hover:bg-red-200 hover:font-bold hover:text-red-900 rounded-md" :class="{
            'bg-red-200 font-bold text-red-900 rounded-md':
              currentContent === 'InformationProfile',
          }">
            <i class="fa-regular fa-circle-user text-lg"></i>
            <span class="ml-2 text-lg">Information</span>
          </a>
        </li>
        <!-- <li class="mb-2"
        @click="changeContent('CreateCampaignsProfile')">
          <a href="#"
            class="flex items-center gap-1 p-3 text-gray-700 hover:bg-red-200 hover:font-bold hover:text-red-900 rounded-md"
            :class="{
              'bg-red-200 font-bold text-red-900 rounded-md':
                currentContent === 'CreateCampaignsProfile',
            }">
            <i class="fa-regular fa-square-plus text-lg"></i>
            <span class="ml-2 text-lg">Create Campaigns</span>
          </a>
        </li> -->

        <li class="mb-2"
        @click="changeContent('MyCampaignsProfile')">
          <a href="#"
            class="flex items-center gap-1 p-3 text-gray-700 hover:bg-red-200 hover:font-bold hover:text-red-900 rounded-md"
            :class="{
              'bg-red-200 font-bold text-red-900 rounded-md':
                currentContent === 'MyCampaignsProfile',
            }">
            <i class="fa-solid fa-boxes-stacked text-lg"></i>
            <span class="ml-2 text-lg">My Campaign</span>
          </a>
        </li>

        <li class="mb-2"
        @click="changeContent('VotedCampaignsProfile')">
          <a href="#"
            class="flex items-center gap-1 p-3 text-gray-700 hover:bg-red-200 hover:font-bold hover:text-red-900 rounded-md"
            :class="{
              'bg-red-200 font-bold text-red-900 rounded-md':
                currentContent === 'VotedCampaignsProfile',
            }">
            <i class="fa-solid fa-clock-rotate-left text-lg"></i>
            <span class="ml-2 text-lg">History Voted</span>
          </a>
        </li>
        
        <li class="mb-2">
          <a href="#"
            class="flex items-center gap-1 p-3 text-gray-700 hover:bg-red-200 hover:font-bold hover:text-red-900 rounded-md"
            :class="{
              'bg-red-200 font-bold text-red-900 rounded-md':
                currentContent === 'Logout',
            }">
            <i class="fa-solid fa-arrow-right-from-bracket text-lg"></i>
            <span class="ml-2 text-lg">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- <div class="mt-auto">
      <div class="p-4 bg-blue-100 rounded-md">
        <p class="text-blue-700">Refer a Friend and Get Rewards!</p>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      currentContent: "InformationProfile", // Mặc định hiển thị Dashboards
      walletAddress: localStorage.getItem('walletAddress') || null,
    };
  },
  methods: {
    changeContent(newContent) {
      this.currentContent = newContent;
      this.$emit("changeContent", newContent); // Phát ra sự kiện khi nội dung thay đổi
    },
  },
  computed: {
    shortenedAddress() {
      if (!this.walletAddress) return null;
      return `${this.walletAddress.slice(0, 6)}...${this.walletAddress.slice(-4)}`;
    }
  },
};
</script>
