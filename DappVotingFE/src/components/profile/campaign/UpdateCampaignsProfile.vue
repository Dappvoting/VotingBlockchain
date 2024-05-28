<template>
  <div class="w-full bg-white min-h-screen rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-4">
    <span class="flex justify-center text-red-900 font-bold text-2xl py-5">Update Campaign</span>
    
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
          <button type="submit" class="px-4 py-2 bg-blue-600 hover:opacity-75 text-white rounded">Update</button>
        </div>
      </form>
    </div>

    <!-- Updating Spinner and Success Message -->
    <div v-if="updateProcessing || updateSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div v-if="!updateSuccess" class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
          <span class="ml-4">Updating in progress...</span>
        </div>
        <div v-else class="w-[200px] h-[100px] flex flex-col gap-4 justify-center items-center">
          <i class="fa-solid fa-circle-check text-green-500 font-bold text-xl"></i>
          <span class="text-green-500 font-bold text-xl">Updated Successfully</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { updatePoll } from '../../../clientFunctions'; 
import { loadAllPollTest } from '../../../apollo';

export default {
  name: "UpdateCampaignsProfile",
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentContent: "UpdateCampaignsProfile",
      form: {
        name: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
        status: "public",
        wallets: [],
        description: ""
      },
      walletsText: "",
      originalForm: {}, // Lưu trữ bản gốc của form để kiểm tra thay đổi
      polls: [], // Lưu trữ các polls để lấy chi tiết
      updateProcessing: false,
      updateSuccess: false
    };
  },
  watch: {
    pollId: {
      immediate: true,
      handler() {
        this.fetchPollDetails();
      }
    }
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
    async fetchPollDetails() {
      try {
        // Fetch data từ Apollo và cập nhật polls
        loadAllPollTest(this.dispatchPolls);
      } catch (error) {
        console.error('Error fetching poll details:', error);
      }
    },
    dispatchPolls(action) {
      switch (action.type) {
        case "POLL_CREATED_LOADED":
          this.polls = action.pollCreateds;
          this.updateFormData();
          break;
        case "POLL_UPDATEDS_LOADED":
          this.polls = action.pollUpdateds;
          this.updateFormData();
          break;
        default:
          break;
      }
    },
    updateFormData() {
      let pollData = this.polls.find(poll => poll.Contract_id === this.pollId);
      if (pollData) {
        this.form.name = pollData.title;
        this.form.startDate = new Date(pollData.startsAt * 1000).toISOString().substr(0, 10);
        this.form.endDate = new Date(pollData.endsAt * 1000).toISOString().substr(0, 10);
        this.form.imageUrl = pollData.image;
        this.form.status = pollData.isPublic ? 'public' : 'private';
        this.form.description = pollData.description;
        this.form.wallets = pollData.wallets || [];
        this.walletsText = this.form.wallets.join("\n");

        // Lưu trữ bản gốc của form
        this.originalForm = { ...this.form };
      }
    },
    async submitForm() {
      // Kiểm tra xem form có thay đổi không
      if (JSON.stringify(this.form) === JSON.stringify(this.originalForm)) {
        this.changeContent('MyCampaignsProfile');
        return;
      }

      this.updateProcessing = true;
      try {
        const { name, startDate, endDate, imageUrl, status, wallets, description } = this.form;
        const isPublic = status === 'public';
        
        // Gọi hàm updatePoll
        await updatePoll(this.pollId, imageUrl, name, description, new Date(startDate).getTime() / 1000, new Date(endDate).getTime() / 1000, isPublic);

        // Hiển thị thông báo thành công
        this.updateSuccess = true;
        setTimeout(() => {
          this.updateSuccess = false;
          this.changeContent('MyCampaignsProfile');
        }, 2000);
      } catch (error) {
        console.error('Error updating campaign:', error);
        alert('Error updating campaign. Please try again.');
      } finally {
        this.updateProcessing = false;
      }
    }
  },
  mounted() {
    if (this.pollId) {
      this.fetchPollDetails();
    }
  }
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
