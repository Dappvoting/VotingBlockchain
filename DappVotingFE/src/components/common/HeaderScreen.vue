<template>
  <div class="bg-black py-2">
    <div
      class="flex gap-4 justify-between items-center mx-auto desktop:w-[1200px] max-sm:w-full desktop:px-0 text-white"
    >
      <div class="flex gap-4 items-center">
        <div class="flex gap-2 items-center pr-4 border-r border-r-gray-600">
          <i class="fa-solid fa-envelope text-xs"></i>
          <span class="text-xs font-bold">hoquangdat001@gmail.com</span>
        </div>
        <div class="flex gap-2 items-center">
          <i class="fa-solid fa-location-dot text-xs"></i>
          <span class="text-xs font-bold">170 An Dương Vương</span>
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <div class="flex gap-4 items-center pr-4 border-r border-r-gray-600">
          <i class="fa-brands fa-facebook-f text-xs cursor-pointer"></i>
          <i class="fa-brands fa-linkedin-in text-xs cursor-pointer"></i>
          <i class="fa-brands fa-twitter text-xs cursor-pointer"></i>
        </div>
        <div class="flex gap-4 items-center pr-4 border-r border-r-gray-600">
          <a href="/guide">
            <i class="fa-solid fa-circle-question cursor-pointer"></i>
          </a>
        </div>

        <div class="flex gap-4 items-center cursor-pointer">
          <i class="fa-solid fa-user text-xs"></i>
          <span class="text-xs font-bold">
            <a href="/login">Login</a>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white">
    <div
      class="flex items-center justify-between mx-auto desktop:w-[1200px] max-sm:w-full desktop:px-0"
    >
      <div class="">
        <img
          class="h-20 w-full max-sm:w-[80px] sm:w-[150px] text-white z-10"
          src="../../assets/images/HomePage/logo3.svg"
          alt=""
        />
      </div>

      <div class="flex gap-6">
        <div :class="linkClass('/home')" class="cursor-pointer">
          <router-link to="/home">Home</router-link>
        </div>
        <div :class="linkClass('/campaign')" class="cursor-pointer">
          <router-link to="/campaign">Campaign</router-link>
        </div>
        <div :class="linkClass('/contact')" class="cursor-pointer">
          <router-link to="/contact">Contact</router-link>
        </div>
        <div :class="linkClass('/about')" class="cursor-pointer">
          <router-link to="/about">About</router-link>
        </div>
      </div>
      <div class="desktop:w-[150px]">
        <a href="/login">
          <i class="fa-regular fa-circle-user text-2xl cursor-pointer"></i>
        </a>
      </div>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
export default {
  computed: {
    currentRoute() {
      return this.$route.path;
    },
    linkClass() {
      return (path) => {
        return {
          'text-blue-900 font-bold': this.currentRoute === path,
          '': this.currentRoute !== path
        };
      };
    }
  }
}
</script>