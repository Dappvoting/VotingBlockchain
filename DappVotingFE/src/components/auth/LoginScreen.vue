<template>
  <div class="flex max-sm:flex-col sm:flex-col desktop:flex-row my-20 border desktop:max-w-[60%] max-sm:w-full sm:w-full mx-auto min-h-[450px] rounded-xl shadow-2xl">
    <div class="p-10 flex flex-col gap-10 desktop:w-1/2 max-sm:w-full sm:w-full">
      <form class="flex justify-center">
        <div class="flex flex-col gap-2 w-2/3">
          <div class="flex justify-center">
            <img class="w-[130px] h-[130px]" src="../../assets/images/HomePage/logo3.png" alt="">
          </div>
          <h1 class="font-bold text-xl flex justify-center text-center text-red-900">Welcome back!</h1>
          <span class="flex justify-center text-gray-600">Sign in to continue to NextGenVote</span>
          <div @click="connectMetaMask" class="flex h-full w-full py-2 cursor-pointer items-center justify-between rounded bg-gradient-to-l from-[#ff5c00] to-[#ffdc24] px-4 text-base text-white hover:opacity-90">
            <img class="w-7 h-7" src="https://www.app.xoffer.io/assets/images/ui/metamask.svg" alt="">
            <span class="">Login with MetaMask</span>
            <div></div>
          </div>
        </div>
      </form>
    </div>
    <div class="bg-cover bg-[url('https://snworksceo.imgix.net/ufa/53bb907e-6cf4-4ae6-a8e8-4ec0eee8e8a5.sized-1000x1000.jpeg?w=1000')] bg-center object-cover desktop:rounded-tr-xl sm:rounded-bl-xl max-sm:rounded-bl-xl max-sm:py-5 desktop:w-1/2 max-sm:w-full sm:w-full rounded-br-xl flex flex-col gap-4 justify-center items-center">
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
          // Request access to MetaMask
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          this.account = accounts[0];
          console.log('Connected to account:', this.account);

          // Generate a random nonce for signing
          const nonce = Math.floor(Math.random() * 1000000).toString();
          const message = `Please sign this message to log in: ${nonce}`;

          // Request user to sign the message
          const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, this.account],
          });

          console.log('Signature:', signature);

          // Verify the signature (this should be done on the server side in a real application)
          const recoveredAddress = ethers.utils.verifyMessage(message, signature);
          if (recoveredAddress.toLowerCase() === this.account.toLowerCase()) {
            console.log('Signature verified, logged in successfully');

            // Save wallet address to local storage
            localStorage.setItem('walletAddress', this.account);

            // Emit event to update wallet address
            this.$root.$emit('walletAddressChanged', this.account);

            // Check and switch to Sepolia network if necessary
            const sepoliaChainId = '0xaa36a7'; // Chain ID for Sepolia network
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

            if (currentChainId !== sepoliaChainId) {
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: sepoliaChainId }],
                });
                console.log('Switched to Sepolia network');
              } catch (switchError) {
                // Network is not added to MetaMask
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
                    console.log('Added and switched to Sepolia network');
                  } catch (addError) {
                    console.error('Error adding Sepolia network:', addError);
                  }
                } else {
                  console.error('Error switching network:', switchError);
                }
              }
            }

            // Redirect to home page
            this.$router.push('/home');

            // Create an ethers provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log('Signer:', signer);
          } else {
            console.error('Signature verification failed');
          }
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        alert('MetaMask is not installed. Please install MetaMask and try again.');
      }
    },
  },
};
</script>
