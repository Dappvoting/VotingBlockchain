import { ethers } from 'ethers';
import contractAbi from '../../artifacts/contracts/DappVotes.sol/DappVotes.json';

// Kết nối MetaMask và thiết lập provider và signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
const contractAddress = '0xD41c27022F0e44E8c620bfe82b803515d207bD1d'; // Thay thế bằng địa chỉ hợp đồng của bạn

// Tạo một instance của hợp đồng
const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);

// Hàm tạo Poll
export async function createPoll(image, title, description, startsAt, endsAt, isPublic) {
  try {
    const tx = await contract.createPoll(image, title, description, startsAt, endsAt, isPublic);
    await tx.wait();
    console.log('Poll created successfully');
  } catch (error) {
    console.error('Error creating poll:', error);
  }
}

// Hàm cập nhật Poll
export async function updatePoll(id, image, title, description, startsAt, endsAt, isPublic) {
  try {
    const tx = await contract.updatePoll(id, image, title, description, startsAt, endsAt, isPublic);
    await tx.wait();
    console.log('Poll updated successfully');
  } catch (error) {
    console.error('Error updating poll:', error);
  }
}

// Hàm xóa Poll
export async function deletePoll(id) {
  try {
    const tx = await contract.deletePoll(id);
    await tx.wait();
    console.log('Poll deleted successfully');
  } catch (error) {
    console.error('Error deleting poll:', error);
  }
}

// Hàm thêm Contestant vào Poll
export async function contest(pollId, name, image) {
  try {
    const tx = await contract.contest(pollId, name, image);
    await tx.wait();
    console.log('Contestant added successfully');
  } catch (error) {
    console.error('Error adding contestant:', error);
  }
}

// Hàm bỏ phiếu cho Contestant
export async function vote(pollId, contestantId) {
  try {
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

// Hàm thêm Authorized Voters vào Poll
export async function addAuthorizedVoters(pollId, voters) {
  try {
    const tx = await contract.addAuthorizedVoters(pollId, voters);
    await tx.wait();
    console.log('Authorized voters added successfully');
  } catch (error) {
    console.error('Error adding authorized voters:', error);
  }
}
