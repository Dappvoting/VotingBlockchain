<template>
  <div class="w-full bg-white min-h-screen rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-4">
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
          <label for="fileInput" class="block text-gray-700 font-bold mt-4">Upload Excel File</label>
          <input type="file" id="fileInput" @change="handleFileUpload" class="w-full mt-2 focus:outline-none p-2 border rounded">
          <div class="mt-4">
            <label for="walletsArea" class="block text-gray-700 font-bold">Wallet Addresses</label>
            <textarea id="walletsArea" v-model="walletsText" class="w-full mt-2 focus:outline-none p-2 border rounded" disabled></textarea>
          </div>
        </div>
        
        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-bold">Description</label>
          <textarea id="description" placeholder="Description about your campaign" v-model="form.description" class="w-full mt-2 focus:outline-none resize-none p-2 border rounded"></textarea>
        </div>
        
        <div class="flex justify-end gap-2">
          <button @click="changeContent('MyCampaignsProfile')" type="button" class="px-4 py-2 bg-gray-600 hover:opacity-75 text-white rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 hover:opacity-75 text-white rounded">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { createPoll, addAuthorizedVoters } from '../../../clientFunctions';

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
        wallets: [],
        description: ""
      },
      walletsText: ""
    };
  },
  methods: {
    changeContent(newContent) {
      this.currentContent = newContent;
      this.$emit("changeContent", newContent); // Emit event when content changes
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          this.processExcelData(jsonData);
        };
        reader.readAsArrayBuffer(file);
      }
    },
    processExcelData(data) {
      const wallets = [];
      data.forEach((row, index) => {
        if (index > 0) { // Skip header row
          const wallet = row[1]; // Assume the wallet address is in the second column
          if (wallet) wallets.push(wallet.trim());
        }
      });
      this.form.wallets = wallets;
      this.walletsText = wallets.join("\n");
    },
    async submitForm() {
      try {
        const { name, startDate, endDate, imageUrl, status, wallets, description } = this.form;
        const isPublic = status === 'public';
        
        // Call createPoll function
        await createPoll(imageUrl, name, description, new Date(startDate).getTime() / 1000, new Date(endDate).getTime() / 1000, isPublic);
        
        // Display success message
        alert('Campaign created successfully');
        
        // Redirect to MyCampaignsProfile
        this.changeContent('MyCampaignsProfile');
      } catch (error) {
        console.error('Error creating campaign:', error);
        alert('Error creating campaign. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
