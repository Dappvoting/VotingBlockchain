<template>
  <div class="w-full bg-white min-h-screen rounded-lg shadow-[rgba(13,_38,76,_0.19)_0px_9px_20px] px-4">
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
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const CREATE_POLL_MUTATION = gql`
  mutation CreatePoll($name: String!, $startDate: BigInt!, $endDate: BigInt!, $imageUrl: String!, $isPublic: Boolean!, $description: String!) {
    createPoll(name: $name, startDate: $startDate, endDate: $endDate, imageUrl: $imageUrl, isPublic: $isPublic, description: $description) {
      id
      name
      startDate
      endDate
      imageUrl
      isPublic
      description
    }
  }
`;

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
      },
      walletsText: "",
    };
  },
  setup() {
    const { mutate: createPoll } = useMutation(CREATE_POLL_MUTATION);

    return {
      createPoll,
    };
  },
  methods: {
    changeContent(newContent) {
      this.currentContent = newContent;
      this.$emit("changeContent", newContent);
    },
    generateVoterInputs() {
      const numVoters = parseInt(this.form.numVoters);
      if (isNaN(numVoters) || numVoters < 1) {
        this.form.wallets = [];
      } else {
        this.form.wallets = Array(numVoters).fill("");
      }
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
          const wallet = row[1]; // Chọn đúng cột chứa địa chỉ ví (giả sử cột thứ 2 chứa địa chỉ ví)
          if (wallet) wallets.push(wallet.trim());
        }
      });
      this.form.wallets = wallets;
      this.walletsText = wallets.join("\n");
    },
    async submitForm() {
      const { name, startDate, endDate, imageUrl, status, description } = this.form;
      const isPublic = status === "public";

      // Chuyển đổi các giá trị BigInt sang chuỗi để đảm bảo chúng được truyền đúng cách
      const startDateBigInt = BigInt(new Date(startDate).getTime());
      const endDateBigInt = BigInt(new Date(endDate).getTime());

      // In log các biến trước khi gọi mutation
      console.log("Form Data:", {
        name,
        startDate: startDateBigInt,
        endDate: endDateBigInt,
        imageUrl,
        isPublic,
        description,
      });

      // Kiểm tra xem các biến có được truyền đúng không
      if (!name || !startDateBigInt || !endDateBigInt || !imageUrl || !description) {
        console.error("Missing required fields");
        return;
      }

      try {
        const response = await this.createPoll({
          variables: {
            name: name,
            startDate: startDateBigInt,
            endDate: endDateBigInt,
            imageUrl: imageUrl,
            isPublic: isPublic,
            description: description,
          },
        });

        console.log(response.data);
        this.changeContent('MyCampaignsProfile');
      } catch (error) {
        console.error("Error creating poll:", error);
      }
    }
  }
};
</script>
