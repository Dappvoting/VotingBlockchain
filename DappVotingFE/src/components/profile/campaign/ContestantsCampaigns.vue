<template>
  <div class="bg-white min-h-screen rounded-xl p-6 shadow-[rgba(13,_38,76,0.19)_0px_9px_20px]">
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
        <span class="font-semibold">May 20 2024 3:10 PM</span>
      </div>
      <div class="flex gap-4">
        <span class="text-gray-500 font-semibold">End Date:</span>
        <span class="font-semibold">May 25 2024 3:10 PM</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6">
        <div class="grid grid-cols-2 gap-2">
        <div
          class="bg-white rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
        >
          <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
          <img
            class="w-full h-[200px] rounded-lg transition duration-300 ease-in-out"
            src="https://c.ndtvimg.com/2023-12/4plm17lo_donald-trump-afp_625x300_20_December_23.jpeg"
            alt=""
          />
        </div>
        <div
          class="flex flex-col justify-between p-4 bg-white rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
        >
          <div class="flex flex-col gap-2">
            <span class="flex justify-center font-bold text-xl"
              >Donald Trump</span
            >
            <!-- <span class="text-sm text-gray-500">Lớp phó học tập</span> -->
          </div>
          <!-- <span
            class="flex justify-center w-full cursor-pointer items-center py-2 px-4 rounded-md bg-blue-900 text-white hover:opacity-70"
            >Vote</span
          >
          <div class="flex justify-center items-center gap-2">
            <i
              class="fa-solid fa-arrow-up bg-blue-200 p-2 rounded-lg text-blue-900"
            ></i>
            <span class="text-blue-900 font-bold">0</span>
            <span class="text-blue-900 font-bold">vote</span>
          </div> -->
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div
          class="bg-white rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
        >
          <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
          <img
            class="w-full h-[200px] rounded-lg transition duration-300 ease-in-out"
            src="https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200630133336-01-biden-0630.jpg"
            alt=""
          />
        </div>
        <div
          class="flex flex-col justify-between p-4 bg-white rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
        >
          <div class="flex flex-col gap-2">
            <span class="flex justify-center font-bold text-xl"
              >Joe Biden</span
            >
            <!-- <span class="text-sm text-gray-500">Lớp phó học tập</span> -->
          </div>
          <!-- <span
            class="flex justify-center w-full cursor-pointer items-center py-2 px-4 rounded-md bg-blue-900 text-white hover:opacity-70"
            >Vote</span
          >
          <div class="flex justify-center items-center gap-2">
            <i
              class="fa-solid fa-arrow-up bg-blue-200 p-2 rounded-lg text-blue-900"
            ></i>
            <span class="text-blue-900 font-bold">0</span>
            <span class="text-blue-900 font-bold">vote</span>
          </div> -->
        </div>
      </div>

      
    </div>
    <div class="flex justify-end gap-2 mt-6">
      <button @click="changeContent('CreateCampaignsProfile')" type="submit" class="px-4 py-2 bg-gray-600 hover:opacity-75 text-white rounded">Back</button>
      <button @click="changeContent('MyCampaignsProfile')" type="submit" class="px-4 py-2 bg-blue-900 hover:opacity-75 text-white rounded">Save</button>
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
  </div>
</template>


<script>
export default {
  name: "ContestantsCampaigns",
  data() {
    return {
      currentContent: "CreateCampaignsProfile",
      showPopup: false,
      newContestant: {
        name: "",
        description: "",
        image: ""
      }
    };
  },
  methods: {
    changeContent(newContent) {
      this.currentContent = newContent;
      this.$emit("changeContent", newContent); // Phát ra sự kiện khi nội dung thay đổi
    },
    addContestant() {
      // Xử lý logic thêm ứng viên mới tại đây
      console.log(this.newContestant);
      // Sau khi thêm thành công, đóng popup và reset form
      this.showPopup = false;
      this.newContestant = { name: "", description: "", image: "" };
    }
  }
};
</script>

