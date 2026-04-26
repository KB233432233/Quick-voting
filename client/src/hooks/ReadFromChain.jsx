import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../context/constants";

// Public RPC for reading without a wallet
const SEPOLIA_RPC_URL = "https://sepolia.infura.io/v3/bc605433bf354b83a87269063fd5aa97";

const getProvider = (web3authProvider) => {
  if (web3authProvider) {
    return new ethers.BrowserProvider(web3authProvider);
  }
  return new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
};

export const getPollsFromChain = async (web3authProvider) => {
  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    const totalPolls = await contract.pollCount();
    const allPollIds = await contract.getAllPolls();

    console.log("Total Polls:", totalPolls.toString());
    return allPollIds;
  } catch (error) {
    console.error("Error reading polls from chain:", error);
    return [];
  }
};

export const getPollDetailsFromChain = async (web3authProvider, pollId) => {
  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    const details = await contract.getPollDetails(pollId);
    return {
      title: details.title,
      startTime: Number(details.startTime),
      endTime: Number(details.endTime),
      candidateCount: Number(details.candidateCount),
      maxChoices: Number(details.maxChoices),
      candidateNames: details.candidateNames,
      creator: details.creator,
      voteType: Number(details.voteType),
      currentState: Number(details.currentState)
    };
  } catch (error) {
    console.error(`Error reading details for poll ${pollId}:`, error);
    return null;
  }
};

export const getUserRoleFromChain = async (web3authProvider, userAddress) => {
  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    const role = await contract.getUserRole(userAddress);
    return role; // "Admin", "Organization", "Auditor", or "User"
  } catch (error) {
    console.error("Error reading user role:", error);
    return "User";
  }
};

export const checkHasUserVoted = async (web3authProvider, pollId, userAddress) => {
  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    return await contract.hasUserVoted(pollId, userAddress);
  } catch (error) {
    console.error("Error checking if user voted:", error);
    return false;
  }
};

export const checkIsAllowedVoter = async (web3authProvider, pollId, userAddress) => {
  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    return await contract.isAllowedVoter(pollId, userAddress);
  } catch (error) {
    console.error("Error checking if user is allowed voter:", error);
    return false;
  }
};

export const getPollWinner = async (web3authProvider, pollId) => {
  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    const winnerIndex = await contract.computeWinner(pollId);
    return Number(winnerIndex);
  } catch (error) {
    console.error("Error computing winner (poll may not be finalized):", error);
    return null;
  }
};

export const getPollVotes = async (web3authProvider, pollId) => {
  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    const rawVotes = await contract.getVotes(pollId);
    // getVotes returns uint256[][]. Convert BigInts to Numbers
    return rawVotes.map(round => round.map(vote => Number(vote)));
  } catch (error) {
    console.error(`Error reading votes for poll ${pollId}:`, error);
    return [];
  }
};

