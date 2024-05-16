<template>
  <div class="flex gap-4 flex-col md:flex-row justify-between p-4 bg-white rounded-lg">
    <!-- Left section -->
    <div class="md:w-1/2 p-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  rounded-lg">
      <div class="flex items-center mb-4">
        <img src="https://wp.xpeedstudio.com/electionify/wp-content/uploads/2019/12/mission-and-vission-1.png" alt="Game Thumbnail" class="w-20 h-20 rounded-xl mr-4 object-cover" />
        <div>
          <h2 class="text-xl font-bold">GH - Battle Arena</h2>
          <p class="text-sm text-gray-500">Fighting game from GalaxyHunters World</p>
        </div>
      </div>

      <div class="mb-4">
        <p class="text-lg font-bold mb-2">Current Results:</p>
        <div class="flex items-center mb-2">
          <p class="w-12">Yes:</p>
          <div class="flex-grow bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div class="bg-pink-500 h-2.5" style="width: 76%;"></div>
          </div>
          <p class="ml-2">76%</p>
        </div>
        <div class="flex items-center">
          <p class="w-12">No:</p>
          <div class="flex-grow bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div class="bg-pink-500 h-2.5" style="width: 24%;"></div>
          </div>
          <p class="ml-2">24%</p>
        </div>
      </div>
    </div>
    <!-- Right section -->
    <div class="md:w-1/2 p-4  rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <h3 class="text-xl font-bold mb-4">1724 Votes</h3>
      <ul class="overflow-y-auto h-64">
        <li v-for="(user, index) in users" :key="index" class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <img :src="user.avatar" alt="User Avatar" class="w-8 h-8 rounded-full mr-2" />
            <p>{{ user.name }}</p>
          </div>
          <p>{{ user.vote }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { name: "aaicripto", avatar: "https://wp.xpeedstudio.com/electionify/wp-content/uploads/2019/12/mission-and-vission-1.png", vote: "Yes" },
        { name: "marsik", avatar: "https://wp.xpeedstudio.com/electionify/wp-content/uploads/2019/12/mission-and-vission-1.png", vote: "Yes" },
        { name: "bilv", avatar: "https://wp.xpeedstudio.com/electionify/wp-content/uploads/2019/12/mission-and-vission-1.png", vote: "Yes" },
        
        // Add more users here
      ],
    };
  },
};
</script>
