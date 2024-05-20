<template>
  <div class="p-6 my-6 border rounded-md bg-red-200 border-red-950">
    <span class="text-red-900 font-bold"
      >Tham gia vào quá trình dân chủ bằng cách bỏ phiếu trong cuộc bầu cử Tổng thống Mỹ. Chọn lãnh đạo phù hợp với tầm nhìn của bạn cho tương lai của quốc gia!.
    </span>
  </div>
  <div class="flex justify-between pb-4">
    <div class="flex gap-4">
      <span class="text-gray-500 font-semibold">Start Date:</span>
      <span class="font-semibold">May 20 2024 3:10 PM</span>
    </div>

    <div class="flex gap-4">
      <span class="text-gray-500 font-semibold">End Date:</span>
      <span class="font-semibold">May 25 2024 3:10 PM</span>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-10">
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
        <span
          class="flex justify-center w-full cursor-pointer items-center py-2 px-4 rounded-md bg-blue-900 text-white hover:opacity-70"
          >Vote</span
        >
        <div class="flex justify-center items-center gap-2">
          <i
            class="fa-solid fa-arrow-up bg-blue-200 p-2 rounded-lg text-blue-900"
          ></i>
          <span class="text-blue-900 font-bold">5</span>
          <span class="text-blue-900 font-bold">vote</span>
        </div>
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
        </div>
        <span
          class="flex justify-center w-full cursor-pointer items-center py-2 px-4 rounded-md bg-blue-900 text-white hover:opacity-70"
          >Vote</span
        >
        <div class="flex justify-center items-center gap-2">
          <i
            class="fa-solid fa-arrow-up bg-blue-200 p-2 rounded-lg text-blue-900"
          ></i>
          <span class="text-blue-900 font-bold">3</span>
          <span class="text-blue-900 font-bold">vote</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "Candidates",
};
</script>
