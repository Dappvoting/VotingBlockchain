<template>
  <div
    class="relative h-screen bg-cover bg-center bg-[url('https://wp.xpeedstudio.com/electionify/wp-content/uploads/2020/01/banner-bg-img-1.jpeg')]"
  >
    <div class="relative h-screen w-full overflow-hidden">
      <!-- Video Background -->
      <video
        class="absolute top-0 left-0 w-full h-full object-cover"
        src="https://metropolitanhost.com/themes/themeforest/html/vitto/assets/img/video-bg.mp4"
        autoplay
        muted
        loop
      ></video>

      <!-- Overlay Content -->
      <div
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60"
      >
        <div class="text-center">
          <h1 class="text-white font-bold text-6xl mb-4">
            Vote for the best candidate
          </h1>
          <p class="text-white font-bold text-lg mb-6">
            With blockchain technology, we will ensure transparency and fairness
            in elections.
          </p>
          <button
            class="py-2 w-[250px] mx-auto flex justify-between items-center bg-white rounded-md px-2 hover:bg-red-900 hover:text-white transition duration-300 ease-in-out"
          >
            <span class="font-bold">Go Vote Now</span>
            <i class="fas fa-square-check text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="min-h-[450px] bg-cover bg-center bg-[url('https://wp.xpeedstudio.com/electionify/wp-content/uploads/2019/12/campaign-right-banner.png')]"
  >
    <div class="mx-auto desktop:w-[1400px] max-sm:w-full sm:px-3 desktop:px-0">
      <div class="flex flex-col justify-center py-10 gap-6">
        <div
          class="text-center flex flex-col gap-2 justify-center items-center"
        >
          <span class="text-red-500 font-bold">Know more about</span>
          <span class="font-bold text-4xl text-red-900"
            >Our mission and vision</span
          >
          <span class="font-semiboldbold w-2/3 text-center text-gray-600"
            >With blockchain technology, we will ensure transparency and
            fairness in elections.</span
          >
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-white rounded-lg shadow-lg">
            <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
            <img
              class="w-full h-[250px] rounded-t-lg grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              src="../../assets/images/HomePage/fairness.webp"
              alt=""
            />
            <div class="flex flex-col p-8 gap-4">
              <span class="font-bold text-red-900 text-lg"
                >Equality and fairness</span
              >
              <span class="text-sm text-gray-500"
                >With blockchain technology, I can ensure that elections are
                equal and fair.</span
              >
              <div
                class="py-2 w-[150px] hover:text-white hover:bg-red-400 transition duration-300 ease-in-out cursor-pointer flex justify-between rounded-md text-sm items-center text-white bg-gray-900 px-2"
              >
                <span class="font-bold pl-2">Read Plan</span>
                <i class="fa-solid fa-square-check text-xl"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg">
            <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
            <img
              class="w-full h-[250px] rounded-t-lg grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              src="https://wp.xpeedstudio.com/electionify/wp-content/uploads/2019/12/mission-and-vission-1.png"
              alt=""
            />
            <div class="flex flex-col p-8 gap-4">
              <span class="font-bold text-red-900 text-lg"
                >Expanding Voting to Project Investment
              </span>
              <span class="text-sm text-gray-500"
                >Our vision is to extend the functionality of our
                blockchain-based voting tokens beyond traditional elections,
                enabling users to also vote on project investments.</span
              >
              <div
                class="py-2 w-[150px] hover:text-white hover:bg-red-400 transition duration-300 ease-in-out cursor-pointer flex justify-between rounded-md text-sm items-center text-white bg-gray-900 px-2"
              >
                <span class="font-bold pl-2">Read Plan</span>
                <i class="fa-solid fa-square-check text-xl"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg">
            <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
            <img
              class="w-full h-[250px] rounded-t-lg grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              src="../../assets/images/HomePage/adoption.webp"
              alt=""
            />
            <div class="flex flex-col p-8 gap-4">
              <span class="font-bold text-red-900 text-lg"
                >Global Adoption of Valuable Voting Tokens</span
              >
              <span class="text-sm text-gray-500"
                >Our vision is to see our voting tokens widely adopted in
                electoral systems around the world, where they not only serve as
                a means of casting votes but also become valuable assets.</span
              >
              <div
                class="py-2 w-[150px] hover:text-white hover:bg-red-400 transition duration-300 ease-in-out cursor-pointer flex justify-between rounded-md text-sm items-center text-white bg-gray-900 px-2"
              >
                <span class="font-bold pl-2">Read Plan</span>
                <i class="fa-solid fa-square-check text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="min-h-[450px] bg-[url('https://metropolitanhost.com/themes/themeforest/html/vitto/assets/img/innerbanner2.jpg')] flex flex-col items-center justify-center text-white mt-8"
  >
    <div
      class="bg-gradient-to-r bg-opacity-60 inset-0 min-h-[450px] w-full flex justify-center items-center"
    >
      <div class="space-x-60 flex justify-center items-center">
        <div class="flex flex-col items-center gap-2">
          <i class="fa-solid fa-users text-5xl"></i>
          <span class="font-bold text-6xl">10</span>
          <span class="font-bold">Total user</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <i class="fa-solid fa-envelope-open-text text-5xl"></i>
          <span class="font-bold text-6xl">5</span>
          <span class="font-bold">Campaigns</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <i class="fa-solid fa-check-to-slot text-5xl"></i>
          <span class="font-bold text-6xl">7</span>
          <span class="font-bold">Votes</span>
        </div>
      </div>
    </div>
  </div>

  <div class="min-h-[450px] bg-cover bg-center">
    <div
      class="mx-auto desktop:w-[1400px] max-sm:w-full sm:px-3 desktop:px-0 py-10"
    >
      <div class="text-center flex flex-col items-center gap-6">
        <h2 class="text-4xl font-bold text-red-900">Popular Campaign</h2>
        <p class="w-2/3 text-center text-gray-500">
          With blockchain technology, we will ensure transparency and fairness
          in elections.
        </p>
      </div>
      <div class="flex items-center justify-center mt-6">
        <div
          @click="prevCampaign"
          class="text-red-900 text-2xl p-2 cursor-pointer mx-2"
        >
          <i class="fa-solid fa-angle-left"></i>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="(campaign, index) in visibleCampaigns"
            :key="index"
            class="bg-white rounded-lg shadow-lg p-8"
          >
            <img
              :src="campaign.image"
              alt="Campaign Image"
              class="w-full h-[250px] rounded-lg object-cover"
            />
            <div class="flex flex-col gap-1 mt-2">
              <h3 class="font-bold text-red-900 text-lg">
                {{ campaign.title }}
              </h3>
              <p class="text-sm text-gray-500 line-clamp-3">
                {{ campaign.description }}
              </p>
            </div>
          </div>
        </div>
        <div
          @click="nextCampaign"
          class="text-red-900 text-2xl p-2 cursor-pointer mx-2"
        >
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </div>
    </div>
  </div>

  <div class="">
    <div
      class="mx-auto desktop:w-[1400px] max-sm:w-full sm:px-3 desktop:px-0 py-6"
    >
      <div class="text-center flex flex-col items-center gap-6">
        <h2 class="text-4xl font-bold text-red-900">Chain support</h2>
        <p class="w-2/3 text-center text-gray-500">
          NextGenVote is live on Sepolia testnet.
        </p>
      </div>
      <div class="flex justify-center">
        <img
          class="w-15 h-15 object-cover"
          src="../../assets/images/HomePage/sepologo.png"
          alt=""
        />
      </div>
    </div>
  </div>

  <div class="">
    <div
      class="mx-auto desktop:w-[1400px] max-sm:w-full sm:px-3 desktop:px-0 py-6"
    >
      <div
        class="w-full relative flex inset-0 bg-gray-800 mix-blend-luminosity"
      >
        <img
          class="w-full object-cover"
          src="https://wp.xpeedstudio.com/electionify/wp-content/uploads/2020/01/newsletter-overlay.png"
          alt=""
        />
        <div class="absolute text-white grid grid-cols-2 w-full h-full">
          <div class="flex flex-col items-center justify-center">
            <span class="font-bold text-4xl">Don’t miss any updates</span>
            <span class="font-bold text-4xl">Get subscribed!</span>
          </div>
          <!-- <div class="flex justify-center items-center">
            <div class="relative">
              <input type="text" placeholder="Enter your mail"
                class="input text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
              <button
                class="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Send</button>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <div
    class="min-h-[450px] bg-[url('https://metropolitanhost.com/themes/themeforest/html/vitto/assets/img/innerbanner2.jpg')] flex flex-col items-center justify-center text-white mt-8"
  >
    <div
      class="bg-gradient-to-r inset-0 min-h-[450px] w-full flex justify-center"
    >
      <div class="py-10">
        <span class="font-bold text-5xl justify-center flex">How it work</span>
        <div class="grid grid-cols-2 gap-20 pt-5">
          <div class="flex flex-col">
            <span class="font-bold text-2xl text-gradient-to-r"
              >Create campaigns simply and quickly</span
            >
            <div class="pt-2 flex flex-col gap-2">
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  1
                </div>
                <span class="font-bold text-xl">Logging In</span>
              </div>
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  2
                </div>
                <span class="font-bold text-xl"
                  >Accessing Your Profile Page</span
                >
              </div>
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  3
                </div>
                <span class="font-bold text-xl">Selecting ‘My Campaign’</span>
              </div>
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  4
                </div>
                <span class="font-bold text-xl">Starting a New Campaign</span>
              </div>
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  5
                </div>
                <span class="font-bold text-xl">Entering Campaign Details</span>
              </div>
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  6
                </div>
                <span class="font-bold text-xl"
                  >Adding Candidates to the Campaign</span
                >
              </div>
            </div>
          </div>
          <div class="">
            <span class="font-bold text-2xl text-gradient-to-r"
              >Start voting in minutes</span
            >
            <div class="pt-2 flex flex-col gap-2">
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  1
                </div>
                <span class="font-bold text-xl">Logging In</span>
              </div>
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  2
                </div>
                <span class="font-bold text-xl"
                  >Navigating to the Campaign Page</span
                >
              </div>
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  3
                </div>
                <span class="font-bold text-xl">Selecting a Campaign</span>
              </div>
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  4
                </div>
                <span class="font-bold text-xl">Choosing a Contest</span>
              </div>
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  5
                </div>
                <span class="font-bold text-xl">Casting Your Vote</span>
              </div>
              <div
                class="flex items-center gap-2 p-4 rounded-lg hover:bg-red-400 hover:rounded-lg cursor-pointer transition duration-300 ease-in-out"
              >
                <div
                  class="w-10 h-10 flex justify-center items-center rounded-full bg-white font-bold text-lg text-red-900 border border-gradient-to-r"
                >
                  6
                </div>
                <span class="font-bold text-xl">Viewing Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      campaigns: [
        {
          title: "Bầu cử Tổng thống Mỹ 2024",
          description:
            "Tham gia vào quá trình dân chủ bằng cách bỏ phiếu trong cuộc bầu cử Tổng thống Mỹ. Chọn lãnh đạo phù hợp với tầm nhìn của bạn cho tương lai của quốc gia!",
          image:
            "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2Fb066cf06-7b1b-11ee-83ba-000db1848e33.jpg?crop=1500%2C1000%2C0%2C0",
          totalVotes: 3201,
          status: "Active",
        },
        {
          title: "Bầu cử Ban cán sự lớp 10A",
          description:
            "Hãy lựa chọn những bạn học sinh tiêu biểu để đại diện cho lớp 10A trong các hoạt động học tập và vui chơi trong năm học mới!",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJ-wHKOeDK0FC1NPUo2L_puHzNf-w_F_cubrLgC5rPQ&s",
          totalVotes: 867,
          status: "Active",
        },
        {
          title: "Bầu cử Hoa khôi Trường Đại học Quy Nhơn",
          description:
            "Bỏ phiếu chọn ra Hoa khôi duyên dáng và tài năng nhất của Trường Đại học Quy Nhơn. Sự kiện này không chỉ là dịp để tôn vinh vẻ đẹp mà còn là cơ hội để các bạn sinh viên thể hiện tài năng và sự tự tin.",
          image:
            "https://png.pngtree.com/png-vector/20221104/ourmid/pngtree-election-day-political-hand-drawn-cartoon-flat-illustration-with-voters-casting-png-image_6409137.png",
          totalVotes: 1203,
          status: "Active",
        },
        {
          title: "Bầu cử Tổng thống Mỹ 2024",
          description:
            "Tham gia vào quá trình dân chủ bằng cách bỏ phiếu trong cuộc bầu cử Tổng thống Mỹ. Chọn lãnh đạo phù hợp với tầm nhìn của bạn cho tương lai của quốc gia!",
          image:
            "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2Fb066cf06-7b1b-11ee-83ba-000db1848e33.jpg?crop=1500%2C1000%2C0%2C0",
          totalVotes: 3201,
          status: "Active",
        },
        {
          title: "Bầu cử Ban cán sự lớp 10A",
          description:
            "Empower our education system by electing dedicated individuals to our school board. Your vote can shape the future of education in our district!",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJ-wHKOeDK0FC1NPUo2L_puHzNf-w_F_cubrLgC5rPQ&s",
          totalVotes: 867,
          status: "Active",
        },
        {
          title: "Bầu cử Hoa khôi Trường Đại học Quy Nhơn",
          description:
            "Bỏ phiếu chọn ra Hoa khôi duyên dáng và tài năng nhất của Trường Đại học Quy Nhơn. Sự kiện này không chỉ là dịp để tôn vinh vẻ đẹp mà còn là cơ hội để các bạn sinh viên thể hiện tài năng và sự tự tin.",
          image:
            "https://png.pngtree.com/png-vector/20221104/ourmid/pngtree-election-day-political-hand-drawn-cartoon-flat-illustration-with-voters-casting-png-image_6409137.png",
          totalVotes: 1203,
          status: "Active",
        },
      ],
      slideInterval: null,
    };
  },
  computed: {
    visibleCampaigns() {
      let startIndex = this.currentIndex;
      let endIndex = (startIndex + 3) % this.campaigns.length;
      if (endIndex > startIndex) {
        return this.campaigns.slice(startIndex, endIndex);
      } else {
        return this.campaigns
          .slice(startIndex, this.campaigns.length)
          .concat(this.campaigns.slice(0, endIndex));
      }
    },
  },
  methods: {
    nextCampaign() {
      this.currentIndex = (this.currentIndex + 1) % this.campaigns.length;
    },
    prevCampaign() {
      this.currentIndex =
        (this.currentIndex - 1 + this.campaigns.length) % this.campaigns.length;
    },
    startAutoSlide() {
      this.slideInterval = setInterval(this.nextCampaign, 3000);
    },
    stopAutoSlide() {
      clearInterval(this.slideInterval);
    },
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeDestroy() {
    this.stopAutoSlide();
  },
};
</script>

<style scoped>
.campaign-item {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease;
  opacity: 1;
  /* Ensure that the initial state is fully visible */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
