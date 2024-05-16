<template>
  <div class="w-full bg-white min-h-screen rounded-lg shadow-[rgba(13,_38,76,0.19)_0px_9px_20px] px-4">
      <span class="flex justify-center text-red-900 font-bold text-2xl py-5">Create New Campaign</span>


    <div class="p-4">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold">Campaign Name</label>
          <input type="text" placeholder="Campaign Name" id="name" v-model="form.name" class="w-full mt-2 focus:outline-none p-2 border rounded">
        </div>
        
        <div class="mb-4">
          <label for="startDate" class="block text-gray-700 font-bold">Start Date</label>
          <input type="date" id="startDate" v-model="form.startDate" class="w-full mt-2 focus:outline-none p-2 border rounded">
        </div>
        
        <div class="mb-4">
          <label for="endDate" class="block text-gray-700 font-bold">End Date</label>
          <input type="date" id="endDate" v-model="form.endDate" class="w-full mt-2 focus:outline-none p-2 border rounded">
        </div>
        
        <div class="mb-4">
          <label for="imageUrl" class="block text-gray-700 font-bold">Image URL</label>
          <input type="text" placeholder="Image url" id="imageUrl" v-model="form.imageUrl" class="w-full mt-2 focus:outline-none p-2 border rounded">
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 font-bold">Status</label>
          <select v-model="form.status" class="w-full mt-2 focus:outline-none p-2 border rounded">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        
        <div v-if="form.status === 'private'" class="mb-4">
          <label for="numVoters" class="block text-gray-700 font-bold">Number of Voters</label>
          <input type="number" id="numVoters" v-model="form.numVoters" @change="generateVoterInputs" min="1" class="w-full mt-2 focus:outline-none p-2 border rounded">
          <div v-for="(wallet, index) in form.wallets" :key="index" class="mt-2">
            <label :for="'wallet' + index" class="block text-gray-700 font-bold">Wallet Address {{ index + 1 }}</label>
            <input :id="'wallet' + index" v-model="form.wallets[index]" class="w-full mt-2 focus:outline-none p-2 border rounded">
          </div>
        </div>
        
        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-bold">Description</label>
          <textarea id="description" placeholder="Description about your campaign" v-model="form.description" class="w-full mt-2 focus:outline-none resize-none p-2 border rounded"></textarea>
        </div>
        
        <div class="flex justify-end gap-2">
          <button @click="changeContent('MyCampaignsProfile')" type="submit" class="px-4 py-2 bg-gray-600 hover:opacity-75 text-white rounded">Cancel</button>
          <button @click="changeContent('ContestantsCampaigns')" type="submit" class="px-4 py-2 bg-blue-600 hover:opacity-75 text-white rounded">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateCampaignsProfile",
  data() {
    return {
      currentContent: "CreateCampaignsProfile",
      form: {
        name: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
        status: "public",
        numVoters: 1,
        wallets: [],
        description: ""
      }
    };
  },
  methods: {
    changeContent(newContent) {
      this.currentContent = newContent;
      this.$emit("changeContent", newContent); // Phát ra sự kiện khi nội dung thay đổi
    },
    generateVoterInputs() {
      const numVoters = parseInt(this.form.numVoters);
      if (isNaN(numVoters) || numVoters < 1) {
        this.form.wallets = [];
      } else {
        this.form.wallets = Array(numVoters).fill("");
      }
    },
    submitForm() {
      // Xử lý logic gửi form tại đây
      console.log(this.form);
    }
  }
};
</script>
