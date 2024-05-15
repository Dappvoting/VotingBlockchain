<template>
  <div>
      <span class="flex justify-center text-red-900 font-bold text-2xl py-5">Welcome to NextGenVote!</span>
      <div class="w-full">
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white flex flex-col justify-between p-6 rounded-lg min-h-[300px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
              <div>
                  <h2 class="text-xl font-bold mb-4">Connect Wallets</h2>
                  <p>Connected to EVM Wallets:</p>
              </div>
              <div class="flex gap-2 items-center">
                <p ref="walletAddress" class="bg-gray-100 p-2 rounded mt-2 w-full">0x885a046296a0d98c908763892304d5a35497ec1</p>
                <i @click="copyToClipboard" class="fa-regular fa-copy cursor-pointer text-red-900 text-lg"></i>
              </div>
          </div>
          <div class="bg-white p-6 flex flex-col justify-between rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
              <div>
                  <h2 class="text-xl font-bold mb-4">New voting campaigns?</h2>
                  <p>Are you planning a general meeting, a board election or another type of voting project? Create it now using the green button below.</p>
              </div>
            <button class="mt-4 bg-red-900 hover:opacity-80 text-white p-2 rounded">Create Campaign</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
methods: {
  copyToClipboard() {
    const walletAddress = this.$refs.walletAddress.textContent;
    navigator.clipboard.writeText(walletAddress).then(() => {
      alert("Copied to clipboard: " + walletAddress);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
}
}
</script>