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
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONSTRACT_ADDRESS = process.env.CONSTRACT_ADDRESS;

if (!API_URL || !PRIVATE_KEY || !CONSTRACT_ADDRESS) {
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

let provider, signer, contractInstance;

try {
  provider = new ethers.providers.JsonRpcProvider(API_URL);
  signer = new ethers.Wallet(PRIVATE_KEY, provider);
  contractInstance = new ethers.Contract(CONSTRACT_ADDRESS, abi, signer);
} catch (error) {
  console.error("Error initializing ethers:", error);
  process.exit(1);
}

// Create Poll
app.post('/createPoll', async (req, res) => {
  try {
    const { image, title, description, startsAt, endsAt, isPublic } = req.body;
    const tx = await contractInstance.createPoll(image, title, description, startsAt, endsAt, isPublic);
    await tx.wait();
    res.send({ status: 'Poll created successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update Poll
app.post('/updatePoll', async (req, res) => {
  try {
    const { id, image, title, description, startsAt, endsAt, isPublic } = req.body;
    const tx = await contractInstance.updatePoll(id, image, title, description, startsAt, endsAt, isPublic);
    await tx.wait();
    res.send({ status: 'Poll updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete Poll
app.post('/deletePoll', async (req, res) => {
  try {
    const { id } = req.body;
    const tx = await contractInstance.deletePoll(id);
    await tx.wait();
    res.send({ status: 'Poll deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get Poll
app.get('/getPoll', async (req, res) => {
  try {
    const { id } = req.query;
    const poll = await contractInstance.getPoll(id);
    res.send(poll);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get All Polls
app.get('/getPolls', async (req, res) => {
  try {
    const polls = await contractInstance.getPolls();
    res.send(polls);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Contest a Poll
app.post('/contest', async (req, res) => {
  try {
    const { id, name, image } = req.body;
    const tx = await contractInstance.contest(id, name, image);
    await tx.wait();
    res.send({ status: 'Contestant added successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Vote for a Contestant
app.post('/vote', async (req, res) => {
  try {
    const { id, cid } = req.body;
    const tx = await contractInstance.vote(id, cid);
    await tx.wait();
    res.send({ status: 'Vote cast successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Add Authorized Voters
app.post('/addAuthorizedVoters', async (req, res) => {
  try {
    const { id, voters } = req.body;
    const tx = await contractInstance.addAuthorizedVoters(id, voters);
    await tx.wait();
    res.send({ status: 'Authorized voters added successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, function () {
  console.log(`App is listening on port ${port}`);
});
