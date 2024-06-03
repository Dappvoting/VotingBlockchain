<template>
  <div class="w-full bg-white min-h-screen rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-6">
    <div class="flex justify-center items-center py-5">
      <span class="flex justify-center text-red-900 font-bold text-2xl">Authorized Voters</span>
    </div>
    <div class="mb-4">
      <label for="fileInput" class="block text-gray-700 font-bold mt-4">Upload Excel File</label>
      <input type="file" id="fileInput" @change="handleFileUpload" class="w-full mt-2 focus:outline-none p-2 border rounded">
      <div class="mt-4">
        <label for="walletsArea" class="block text-gray-700 font-bold">Wallet Addresses</label>
        <textarea id="walletsArea" v-model="walletsText" class="w-full mt-2 focus:outline-none p-2 border rounded" disabled></textarea>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <button @click="changeContent('MyCampaignsProfile')" type="button" class="px-4 py-2 bg-gray-600 hover:opacity-75 text-white rounded">Cancel</button>
      <button @click="submitAuthorizedVoters" type="button" class="px-4 py-2 bg-blue-600 hover:opacity-75 text-white rounded">Next</button>
      <button @click="createGoogleForm" type="button" class="px-4 py-2 bg-green-600 hover:opacity-75 text-white rounded">Create forms</button>
    </div>

    <!-- Adding Voters Spinner and Success Message -->
    <div v-if="addingVoters || addVotersSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div v-if="!addVotersSuccess" class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
          <span class="ml-4">Adding voters in progress...</span>
        </div>
        <div v-else class="w-[200px] h-[100px] flex flex-col gap-4 justify-center items-center">
          <i class="fa-solid fa-circle-check text-green-500 font-bold text-xl"></i>
          <span class="text-green-500 font-bold text-xl">Voters Added Successfully</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { addAuthorizedVoters } from '../../../clientFunctions';

export default {
  name: 'AuthorizedVoters',
  props: {
    pollId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      wallets: [],
      walletsText: '',
      addingVoters: false,
      addVotersSuccess: false
    };
  },
  methods: {
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
        if (index > 0) {
          const wallet = row[1];
          if (wallet && this.isValidAddress(wallet)) {
            wallets.push(wallet.trim());
          }
        }
      });
      this.wallets = wallets.filter(wallet => wallet);
      this.walletsText = this.wallets.join('\n');
      console.log('Processed wallets:', this.wallets);
    },
    isValidAddress(address) {
      return /^(0x)?[0-9a-f]{40}$/i.test(address);
    },
    async submitAuthorizedVoters() {
      this.addingVoters = true;
      this.addVotersSuccess = false;
      try {
        if (this.wallets.length === 0) {
          alert('No valid wallet addresses found');
          return;
        }
        console.log("POLL ID", this.pollId);
        console.log('Submitting wallets:', this.wallets);
        await addAuthorizedVoters(this.pollId, this.wallets);
        this.addVotersSuccess = true;
        setTimeout(() => {
          this.addVotersSuccess = false;
          this.changeContent('ContestantsCampaigns');
        }, 2000);
      } catch (error) {
        console.error('Error adding authorized voters:', error);
        alert('Error adding authorized voters. Please try again.');
      } finally {
        this.addingVoters = false;
      }
    },
    changeContent(newContent) {
      this.$emit('changeContent', newContent);
    },
    createGoogleForm() {
      const formUrl = 'https://docs.google.com/forms';
      window.open(formUrl, '_blank');
    }
  }
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
