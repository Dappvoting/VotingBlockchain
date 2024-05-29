import { ethers } from 'ethers';
import contractAbi from '../../artifacts/contracts/DappVotes.sol/DappVotes.json';

let provider;
let signer;
let contract;

const contractAddress = '0xf9Edc891dB620758E688102da9021a8Bc5E5298f'; // Replace with your contract address

async function initializeContract() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request connection to MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
    } catch (error) {
      console.error('MetaMask connection failed:', error);
    }
  } else {
    console.warn('MetaMask not detected');
  }
}

// Function to create a poll
export async function createPoll(image, title, description, startsAt, endsAt, isPublic) {
  try {
    await initializeContract();
    const tx = await contract.createPoll(image, title, description, startsAt, endsAt, isPublic);
    await tx.wait();
    console.log('Poll created successfully');
  } catch (error) {
    console.error('Error creating poll:', error);
  }
}

// Function to update a poll
export async function updatePoll(id, image, title, description, startsAt, endsAt, isPublic) {
  try {
    await initializeContract();
    const tx = await contract.updatePoll(id, image, title, description, startsAt, endsAt, isPublic);
    await tx.wait();
    console.log('Poll updated successfully');
  } catch (error) {
    console.error('Error updating poll:', error);
  }
}

// Function to delete a poll
export async function deletePoll(id) {
  try {
    await initializeContract();
    const tx = await contract.deletePoll(id);
    await tx.wait();
    console.log('Poll deleted successfully');
  } catch (error) {
    console.error('Error deleting poll:', error);
  }
}

// Function to add a contestant to a poll
export async function contest(pollId, name, image) {
  try {
    await initializeContract();
    const tx = await contract.contest(pollId, name, image);
    await tx.wait();
    console.log('Contestant added successfully');
  } catch (error) {
    console.error('Error adding contestant:', error);
  }
}

// Function to vote for a contestant
export async function vote(pollId, contestantId) {
  try {
    await initializeContract();
    if (isNaN(contestantId)) {
      throw new Error("Invalid contestant ID");
    }
    const tx = await contract.vote(pollId, parseInt(contestantId));
    await tx.wait();
    console.log('Vote cast successfully');
  } catch (error) {
    console.error('Error casting vote:', error);
  }
}

// Function to add authorized voters to a poll
export async function addAuthorizedVoters(pollId, voters) {
  try {
    await initializeContract();
    const tx = await contract.addAuthorizedVoters(pollId, voters);
    await tx.wait();
    console.log('Authorized voters added successfully');
  } catch (error) {
    console.error('Error adding authorized voters:', error);
  }
}
