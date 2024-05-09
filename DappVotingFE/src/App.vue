<template>
  <div class="flex flex-col min-h-screen">
    <HeaderScreen></HeaderScreen>

    <div class="flex-grow  max-sm:py-0 bg-gray-50">
      <router-view></router-view>
    </div>

    <FooterScreen class="fixed bottom-0 w-full"></FooterScreen>
  </div>

</template>

<script>
import HeaderScreen from "./components/common/HeaderScreen.vue";
import FooterScreen from "./components/common/FooterScreen.vue";

export default {
  mounted() {

  },
  name: "App",
  components: {
    HeaderScreen,
    FooterScreen
  },
  data() {
    return {
    }
  },
   
}
</script>
