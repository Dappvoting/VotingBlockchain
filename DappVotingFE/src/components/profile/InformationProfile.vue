<template>
  <div class="h-screen">
    <span class="flex justify-center text-red-900 font-bold text-2xl py-5"
      >Welcome to NextGenVote!</span
    >
    <div class="w-full">
      <div class="grid grid-cols-2 gap-4">
        <div
          class="bg-white flex flex-col justify-between p-6 rounded-lg min-h-[300px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
        >
          <div>
            <h2 class="text-xl font-bold mb-4">Connect Wallets</h2>
            <p>Connected to MetaMask</p>
          </div>
          <div class="flex gap-2 items-center">
            <p ref="walletAddress" class="bg-gray-100 p-2 rounded mt-2 w-full">
              {{ walletAddr }}
            </p>
            <i
              @click="copyToClipboard"
              class="fa-regular fa-copy cursor-pointer text-red-900 text-lg"
            ></i>
          </div>
        </div>
        <div
          class="bg-white p-6 flex flex-col justify-between rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
        >
          <div>
            <h2 class="text-xl font-bold mb-4">Sepolia Testnet</h2>
            <p>
              Our website utilizes the Sepolia testnet for voting. If you don't have tokens yet, click on the 'Faucet Now' button to get started!
            </p>
          </div>
          <a href="https://www.alchemy.com/faucets/ethereum-sepolia" class="mt-4 bg-red-900 hover:opacity-80 text-white p-2 rounded flex justify-center">
            <button 
          >
            Faucet Now
          </button>
          </a>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useToast } from "vue-toastification";

export default {
  name: "InformationProfile",
  data() {
    return {
      currentContent: "InformationProfile",
      walletAddr: localStorage.getItem("walletAddress") || null,
    };
  },
  setup() {
    const toast = useToast();
    const walletAddress = ref(null);

    const copyToClipboard = () => {
      if (walletAddress.value) {
        navigator.clipboard
          .writeText(walletAddress.value.textContent)
          .then(() => {
            toast.success(
              "Copied to clipboard: " + walletAddress.value.textContent
            );
          })
          .catch((err) => {
            toast.error("Failed to copy: " + err);
          });
      } else {
        toast.error("Wallet address not found.");
      }
    };

    return {
      walletAddress,
      copyToClipboard,
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
