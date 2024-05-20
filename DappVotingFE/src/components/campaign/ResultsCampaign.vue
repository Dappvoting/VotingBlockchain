<template>
  <div class="flex gap-4 flex-col md:flex-row justify-between p-4 bg-white rounded-lg">
    <!-- Left section -->
    <div class="md:w-1/2 p-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  rounded-lg">
      <div class="flex items-center mb-4 gap-4">
        <img class="w-20 h-20 object-cover rounded"src="https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2Fb066cf06-7b1b-11ee-83ba-000db1848e33.jpg?crop=1500%2C1000%2C0%2C0" />
        <div>
          <h2 class="text-xl font-bold">Bầu cử Tổng thống Mỹ 2024</h2>
          <!-- <p class="text-sm text-gray-500">Fighting game from GalaxyHunters World</p> -->
        </div>
      </div>

      <div class="mb-4">
        <p class="text-xl font-bold mb-2 text-red-900">Current Results:</p>
        <div class="grid grid-cols-[0.3fr_1fr] mb-2">
          <p class="w-full font-bold">Donald Trump:</p>
          <div class="flex justify-center items-center">
            <div class="flex-grow bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div class="bg-red-500 h-2.5" style="width: 62.5%;"></div>
            </div>
            <p class="ml-2">62.5%</p>
          </div>

        </div>
        <div class="grid grid-cols-[0.3fr_1fr]">
          <p class="w-full font-bold">Joe Biden:</p>
          <div class="flex justify-center items-center">
            <div class="flex-grow bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div class="bg-red-500 h-2.5" style="width: 37.5%;"></div>
            </div>
            <p class="ml-2">37.5%</p>
          </div>

        </div>
      </div>
    </div>
    <!-- Right section -->
    <div class="md:w-1/2 p-4  rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <h3 class="text-xl font-bold mb-4">8 Votes</h3>
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
export default {
  data() {
    return {
      users: [
        { name: "0x15018225b8654429179831494aEF69932F83F749", avatar: "../../assets/images/HomePage/defaultav.png", vote: "Donald Trump" },
        { name: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", avatar: "../../assets/images/HomePage/defaultav.png", vote: "Joe Biden" },
        { name: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", avatar: "../../assets/images/HomePage/defaultav.png", vote: "Joe Biden" },
        { name: "0x09d632A247cF04b11633B4AF6e4c5A220F239186", avatar: "../../assets/images/HomePage/defaultav.png", vote: "Donald Trump" },
        { name: "0x3326Be9C5EfFf4513288242EB5F16529bC514634", avatar: "../../assets/images/HomePage/defaultav.png", vote: "Donald Trump" },
        { name: "0xcB8A5dFE06a4231156f7cF5600754cDc51371501", avatar: "../../assets/images/HomePage/defaultav.png", vote: "Donald Trump" },
        { name: "0x8B7FF3b17Cfe5B9d3214080fDE570ED3C3B6d553", avatar: "../../assets/images/HomePage/defaultav.png", vote: "Joe Biden" },
        { name: "0x3A097B57Be89933900874B295079999f6203bf96", avatar: "../../assets/images/HomePage/defaultav.png", vote: "Donald Trump" }
        
        // Add more users here
      ],
    };
  },
};
</script>
