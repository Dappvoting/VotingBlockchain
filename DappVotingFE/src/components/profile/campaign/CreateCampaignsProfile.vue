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
          <label for="imageFile" class="block text-gray-700 font-bold">Image File</label>
          <input type="file" id="imageFile" @change="handleFileUpload" class="w-full mt-2 focus:outline-none p-2 border rounded">
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 font-bold">Status</label>
          <select v-model="form.status" class="w-full mt-2 focus:outline-none p-2 border rounded">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
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
    
    <!-- Spinner and Success Message -->
    <div v-if="creatingCampaign || creationSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <div v-if="!creationSuccess" class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
          <span class="ml-4">Creating campaign in progress...</span>
        </div>
        <div v-else class="w-[200px] h-[100px] flex flex-col gap-4 justify-center items-center">
          <i class="fa-solid fa-circle-check text-green-500 font-bold text-xl"></i>
          <span class="text-green-500 font-bold text-xl">Campaign Created Successfully</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { createPoll } from '../../../clientFunctions';

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
      creatingCampaign: false,
      creationSuccess: false,
      selectedFile: null
    };
  },
  methods: {
    changeContent(newContent) {
      this.currentContent = newContent;
      this.$emit("changeContent", newContent);
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async submitForm() {
      this.creatingCampaign = true;
      this.creationSuccess = false;

      try {
        const { name, startDate, endDate, status, description } = this.form;
        const isPublic = status === 'public';

        // Upload file to IPFS via Pinata
        let ipfsUrl = "";
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('file', this.selectedFile);

          const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxBodyLength: 'Infinity',
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              'pinata_api_key': '14251decbf5f9ea74604',
              'pinata_secret_api_key': 'fea635b708ac83419415e1fc88474e5bb34ae08416685b30714d152dcd01516f'
            }
          });
          ipfsUrl = `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
        }

        // Call createPoll function
        await createPoll(ipfsUrl, name, description, new Date(startDate).getTime() / 1000, new Date(endDate).getTime() / 1000, isPublic);

        // Display success message
        this.creationSuccess = true;
        setTimeout(() => {
          this.changeContent('MyCampaignsProfile');
          this.creationSuccess = false;
        }, 2000);
      } catch (error) {
        console.error('Error creating campaign:', error);
        alert('Error creating campaign. Please try again.');
      } finally {
        this.creatingCampaign = false;
      }
    }
  }
};
</script>
