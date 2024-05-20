<template>
  <div
    class="w-full bg-white h-screen rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-4"
  >
    <span class="flex justify-center text-red-900 font-bold text-2xl py-5"
      >History Voted</span
    >
    <div class="grid grid-cols-3 gap-6 py-4">
      <div class="bg-white rounded-lg shadow-lg">
        <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
        <img
          class="w-full h-[200px] rounded-t-lg"
          src="https://png.pngtree.com/png-vector/20221104/ourmid/pngtree-election-day-political-hand-drawn-cartoon-flat-illustration-with-voters-casting-png-image_6409137.png"
          alt=""
        />
        <div class="flex flex-col p-4 gap-2">
          <span class="font-bold text-red-900 text-2xl border-b pb-4"
            >Bầu cử Hoa khôi Trường Đại học Quy Nhơn</span
          >
          <span
            class="text-sm text-gray-500 border-b pb-2 line-clamp-2 font-semibold"
            >Bỏ phiếu chọn ra Hoa khôi duyên dáng và tài năng nhất của Trường Đại học Quy Nhơn. Sự kiện này không chỉ là dịp để tôn vinh vẻ đẹp mà còn là cơ hội để các bạn sinh viên thể hiện tài năng và sự tự tin.</span
          >
          <div class="flex justify-between border-b pb-2">
            <span class="text-sm text-gray-500">Expired time:</span>
            <span class="text-sm text-gray-500 font-semibold"
              >May. 21 2024 4:06 PM</span
            >
          </div>
          <div class="flex justify-between pb-4">
            <span class="text-sm text-gray-500">Status:</span>
            <span
              class="text-sm px-4 py-1 text-yellow-500 border border-yellow-400 bg-yellow-100 rounded-2xl font-semibold"
              >Voted</span
            >
          </div>
          <a
            href="/campaign/details"
            class="py-3 w-full hover:text-white hover:opacity-75 transition duration-300 ease-in-out cursor-pointer flex justify-center rounded-2xl text-sm items-center text-white bg-red-900 px-2"
          >
            <span class="font-bold">View Campaign</span>
            <!-- <i class="fa-solid fa-square-check text-xl"></i> -->
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
