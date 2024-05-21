<template>
  <div
    class="flex max-sm:flex-col sm:flex-col desktop:flex-row my-20 border desktop:max-w-[60%] max-sm:w-full sm:w-full mx-auto min-h-[450px] rounded-xl shadow-2xl">
    <div class="p-10 flex flex-col gap-10 desktop:w-1/2 max-sm:w-full sm:w-full">

      <form class="flex justify-center">
        <div class="flex flex-col gap-2 w-2/3">
          <div class="flex justify-center">
              <img class="w-[130px] h-[130px]" src="../../assets/images/HomePage/logo3.png" alt="">
          </div>
          <h1 class="font-bold text-xl flex justify-center text-center text-red-900">Welcome back!</h1>
          <span class="flex justify-center text-gray-600">Sign in to continue to NextGenVote</span>
          <div 
            @click="connectMetaMask"
            class="flex h-full w-full py-2 cursor-pointer items-center justify-between rounded bg-gradient-to-l from-[#ff5c00] to-[#ffdc24] px-4 text-base text-white hover:opacity-90">
              <img class="w-7 h-7" src="https://www.app.xoffer.io/assets/images/ui/metamask.svg" alt="">
              <span class="">Login with MetaMask</span>
              <div class=""></div>
          </div>
        </div>
      </form>
    </div>
    
    <div
      class="bg-cover bg-[url('https://snworksceo.imgix.net/ufa/53bb907e-6cf4-4ae6-a8e8-4ec0eee8e8a5.sized-1000x1000.jpeg?w=1000')] bg-center object-cover desktop:rounded-tr-xl sm:rounded-bl-xl max-sm:rounded-bl-xl max-sm:py-5 desktop:w-1/2 max-sm:w-full sm:w-full rounded-br-xl flex flex-col gap-4 justify-center items-center">
      <div class="bg-black bg-opacity-60 h-full w-full desktop:rounded-r-xl flex items-center justify-center"> 
          <div class="text-white flex flex-col items-center gap-4 w-full">
              <span class="text-4xl font-bold text-white">Login</span>
              <span class="text-xl px-10 text-center">Welcome to NextGenVote The Web3 Voting App</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";

export default {
  data() {
    return {
      account: null,
    };
  },
  methods: {
    async connectMetaMask() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Yêu cầu quyền truy cập vào MetaMask
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          this.account = accounts[0];
          console.log('Đã kết nối với tài khoản:', this.account);

          // Lưu địa chỉ ví vào Local Storage
          localStorage.setItem('walletAddress', this.account);

          // Phát sự kiện cập nhật địa chỉ ví
          this.$root.$emit('walletAddressChanged', this.account);

          // Kiểm tra và chuyển đổi mạng sang Sepolia nếu cần
          const sepoliaChainId = '0xaa36a7'; // Chain ID của mạng Sepolia
          const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

          if (currentChainId !== sepoliaChainId) {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: sepoliaChainId }],
              });
              console.log('Đã chuyển sang mạng Sepolia');
            } catch (switchError) {
              // Mạng chưa được thêm vào MetaMask
              if (switchError.code === 4902) {
                try {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainId: sepoliaChainId,
                        chainName: 'Sepolia Test Network',
                        nativeCurrency: {
                          name: 'Sepolia ETH',
                          symbol: 'ETH',
                          decimals: 18,
                        },
                        rpcUrls: ['https://rpc.sepolia.org'],
                        blockExplorerUrls: ['https://sepolia.etherscan.io'],
                      },
                    ],
                  });
                  console.log('Đã thêm và chuyển sang mạng Sepolia');
                } catch (addError) {
                  console.error('Lỗi khi thêm mạng Sepolia:', addError);
                }
              } else {
                console.error('Lỗi khi chuyển mạng:', switchError);
              }
            }
          }

          // Chuyển hướng sang trang home
          this.$router.push('/home');

          // Tạo một provider ethers
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          console.log('Signer:', signer);
        } catch (error) {
          console.error('Lỗi khi kết nối với MetaMask:', error);
        }
      } else {
        alert('MetaMask không được cài đặt. Vui lòng cài đặt MetaMask và thử lại.');
      }
    },
    async  setupContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const dappVotesContract = new ethers.Contract(contractAddress, contractABI, signer);

  return dappVotesContract;
}
  },
};
</script>
