<template>
  <div
    class="w-full bg-white min-h-screen rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-6"
  >
    <div class="flex justify-between items-center py-5">
      <div class="w-[130px]">
        <span></span>
      </div>

      <span class="flex justify-center text-red-900 font-bold text-2xl"
        >My Campaign</span
      >
      <div
        @click="changeContent('CreateCampaignsProfile')"
        class="px-3 py-2 rounded text-white bg-blue-600 flex gap-2 justify-center items-center cursor-pointer"
      >
        <span>New Campaign</span>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-6 py-4">
      <div class="bg-white rounded-lg shadow-lg">
        <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
        <img
          class="w-full h-[200px] rounded-t-lg"
          src="https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2Fb066cf06-7b1b-11ee-83ba-000db1848e33.jpg?crop=1500%2C1000%2C0%2C0"
          alt=""
        />
        <div class="flex flex-col p-4 gap-2">
          <span class="font-bold text-red-900 text-2xl border-b pb-4"
            >Bầu cử Tổng thống Mỹ 2024</span
          >
          <span
            class="text-sm text-gray-500 border-b pb-2 line-clamp-2 font-semibold"
            >Tham gia vào quá trình dân chủ bằng cách bỏ phiếu trong cuộc bầu cử Tổng thống Mỹ. Chọn lãnh đạo phù hợp với tầm nhìn của bạn cho tương lai của quốc gia.</span
          >
          <div class="flex justify-between border-b pb-2">
            <span class="text-sm text-gray-500">Expired time:</span>
            <span class="text-sm text-gray-500 font-semibold"
              >May. 10 2024 4:06 PM</span
            >
          </div>
          <div class="flex justify-between pb-4">
            <span class="text-sm text-gray-500">Status:</span>
            <span
              class="text-sm px-4 py-1 text-green-500 border border-green-400 bg-green-100 rounded-2xl font-semibold"
              >Actived</span
            >
          </div>
          <div class="flex gap-1 justify-center items-center">
            <a
            href="/campaign/details"
              class="py-3 w-full hover:text-white hover:opacity-75 transition duration-300 ease-in-out cursor-pointer flex justify-center rounded-2xl text-sm items-center text-white bg-red-900 px-2"
            >
              <span class="font-bold">View Campaign</span>
              <!-- <i class="fa-solid fa-square-check text-xl"></i> -->
          </a>
            <i
              class="fa-solid fa-pen-to-square hover:opacity-75 text-red-900 text-2xl cursor-pointer"
            ></i>
            <i
              class="fa-solid fa-trash-can hover:opacity-75 text-red-900 text-2xl cursor-pointer"
            ></i>
          </div>
         
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      currentContent: "InformationProfile", // Mặc định hiển thị Dashboards
    };
  },
  methods: {
    changeContent(newContent) {
      this.currentContent = newContent;
      this.$emit("changeContent", newContent); // Phát ra sự kiện khi nội dung thay đổi
    },
  },
};
</script>
