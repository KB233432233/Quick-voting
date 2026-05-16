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
    const [title, startTime, endTime, candidateCount, maxChoices, candidateNames, auditors, creator, voteType, currentState, winnerIndex] = await contract.getPollDetails(pollId);
    return {
      title,
      startTime: Number(startTime),
      endTime: Number(endTime),
      candidateCount: Number(candidateCount),
      maxChoices: Number(maxChoices),
      candidateNames,
      auditors,
      creator,
      voteType: Number(voteType),
      currentState: Number(currentState),
      winnerIndex: Number(winnerIndex)
    };
  } catch (error) {
    console.error(`Error reading details for poll ${pollId}:`, error);
    return null;
  }
};

export const getUserRoleFromChain = async (web3authProvider, userAddress) => {
  // Always use standard RPC for reading to ensure we query Sepolia regardless of wallet state
  const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
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
  let contract;
  if (web3authProvider) {
    const provider = new ethers.BrowserProvider(web3authProvider);
    const signer = await provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  } else {
    const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  }

  try {
    // Attempt to get winner from the finalization event first (publicly readable)
    const filter = contract.filters.PollFinalized(pollId);
    const events = await contract.queryFilter(filter);
    
    if (events && events.length > 0) {
      return Number(events[events.length - 1].args.winnerIndex);
    }

    // If no events found, compute dynamically (may revert with AccessDenied)
    const winnerIndex = await contract.computeWinner(pollId);
    return Number(winnerIndex);
  } catch (error) {
    console.error(`Error fetching winner for poll ${pollId}:`, error);
    return null;
  }
};

export const getVotesFromChain = async (web3authProvider, pollId) => {
  if (!web3authProvider) return []; // Must be logged in as Auditor/Owner
  
  const provider = new ethers.BrowserProvider(web3authProvider);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  try {
    const rawVotes = await contract.getVotes(pollId);
    
    // Convert array of arrays logic into a cleaner structure
    const formattedVotes = rawVotes.map((ranking, index) => ({
      id: `tx-${index}`,
      ranking: ranking.map(r => Number(r)), // Array of index choices (1st choice, 2nd choice)
      timestamp: 'N/A (Stored On Chain)', // The contract doesn't store timestamps natively per vote in the state array, only emits them in events
    }));

    return formattedVotes;
  } catch (error) {
    console.error(`Error fetching votes for poll ${pollId}:`, error);
    return [];
  }
};


export const getPollsByOrgFromChain = async (web3authProvider, orgAddress) => {
  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    const pollIds = await contract.getPollsByOrg(orgAddress);
    return pollIds.map(id => Number(id));
  } catch (error) {
    console.error("Error reading org polls:", error);
    return [];
  }
};

export const getPollVotes = async (web3authProvider, pollId) => {
  let contract;
  if (web3authProvider) {
    const provider = new ethers.BrowserProvider(web3authProvider);
    const signer = await provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  } else {
    const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  }

  try {
    // First, attempt to get finalized tallies from events (publicly readable by anyone)
    const filter = contract.filters.RoundTally(pollId);
    const events = await contract.queryFilter(filter);
    
    if (events && events.length > 0) {
      // Return the matrix of round tallies derived from events
      return events.map(e => e.args.voteCounts.map(vote => Number(vote)));
    }

    // If no events found (not finalized), try reading directly from the state
    // (Note: This may revert with AccessDenied for non-auth users)
    const rawVotes = await contract.getVotes(pollId);
    return rawVotes.map(round => round.map(vote => Number(vote)));
  } catch (error) {
    console.error(`Error reading votes for poll ${pollId}:`, error);
    return [];
  }
};

