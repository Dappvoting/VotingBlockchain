import 'dotenv/config';
import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { ethers } from 'ethers';

const app = express();

app.use(fileUpload());
app.use(express.static(path.dirname(fileURLToPath(import.meta.url))));
app.use(express.json());

const port = 3000;

const API_URL = process.env.API_URL;
const CONSTRACT_ADDRESS = process.env.CONSTRACT_ADDRESS;

if (!API_URL || !CONSTRACT_ADDRESS) {
  console.error("Missing environment variables. Please check your .env file.");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const abiPath = path.resolve(__dirname, '../../artifacts/contracts/DappVotes.sol/DappVotes.json');
let abi;

try {
  const abiFile = readFileSync(abiPath, 'utf8');
  abi = JSON.parse(abiFile).abi;
} catch (error) {
  console.error("Error reading ABI file:", error);
  process.exit(1);
}

let provider, contractInstance;

try {
  provider = new ethers.providers.JsonRpcProvider(API_URL);
  contractInstance = new ethers.Contract(CONSTRACT_ADDRESS, abi, provider);
} catch (error) {
  console.error("Error initializing ethers:", error);
  process.exit(1);
}

app.listen(port, function () {
  console.log(`App is listening on port ${port}`);
});
