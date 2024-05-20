<template>
  <div>
    <div class="bg-black py-2">
      <div
        class="flex gap-4 justify-between items-center mx-auto desktop:w-[1400px] max-sm:w-full desktop:px-0 text-white"
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
          <div class="flex gap-4 items-center pr-4 ">
            <a href="/guide">
              <i class="fa-solid fa-circle-question cursor-pointer"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div
        class="flex items-center justify-between mx-auto desktop:w-[1400px] max-sm:w-full desktop:px-0"
      >
        <div class="">
          <img
            class="h-20 w-full max-sm:w-[50px] text-white z-10"
            src="../../assets/images/HomePage/logo5.png"
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
          <!-- <div :class="linkClass('/contact')" class="cursor-pointer">
            <router-link to="/contact">Contact</router-link>
          </div> -->
          <div :class="linkClass('/about')" class="cursor-pointer">
            <router-link to="/about">About</router-link>
          </div>
        </div>
        <div class="desktop:w-[150px] relative">
          <div v-if="walletAddress" class="cursor-pointer p-2 flex gap-2 justify-center items-center" @click="toggleMenu">
            <div class="">
              <img class="w-10 h-10" src="../../assets/images/HomePage/defaultav.png" alt="">
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-red-900">Xin chào,</span>
              <span class="text-sm font-bold"> {{ shortenedAddress }}</span>
            </div>
            
          </div>
          <a v-else href="/login">
            <i class="fa-regular fa-circle-user text-2xl cursor-pointer"></i>
          </a>
          <div v-if="menuVisible" class="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
            <ul>
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer" @click="goToProfile">Profile</li>
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer" @click="logout">Logout</li>
            </ul>
          </div>
        </div>
      </div>
      <div class=""></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      walletAddress: null,
      menuVisible: false,
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
    linkClass() {
      return (path) => {
        return {
          'text-red-900 font-bold': this.currentRoute === path,
          '': this.currentRoute !== path
        };
      };
    },
    shortenedAddress() {
      if (!this.walletAddress) return null;
      return `${this.walletAddress.slice(0, 6)}...${this.walletAddress.slice(-4)}`;
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    goToProfile() {
      this.$router.push('/profile');
      this.menuVisible = false; // Hide the menu when navigating to the profile page
    },
    logout() {
      localStorage.removeItem('walletAddress');
      this.walletAddress = null;
      this.$router.push('/login');
      this.menuVisible = false;
    },
    updateWalletAddress() {
      this.walletAddress = localStorage.getItem('walletAddress');
    }
  },
  mounted() {
    // Initialize walletAddress from localStorage
    this.updateWalletAddress();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          this.walletAddress = accounts[0];
          localStorage.setItem('walletAddress', accounts[0]);
        } else {
          this.logout();
        }
      });
    }
  },
  watch: {
    $route() {
      this.updateWalletAddress();
    }
  }
};
</script>
