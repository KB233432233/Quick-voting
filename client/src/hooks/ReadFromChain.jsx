import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../context/constants";

// Extract only valid ABI fragments to prevent parsing warnings from compiler artifacts
const validAbi = CONTRACT_ABI.filter(
    (item) => item.type === "error" || item.type === "function" || item.type === "event" || item.type === "constructor"
);
const CONTRACT_IFACE = new ethers.Interface(validAbi);

// Map custom ABI error names to human-readable messages
const getErrorMessage = (e) => {
  let errorName = e.reason || e.message || "Unknown error";
    
    // Function to parse the data recursively
    const parseErrorData = (data) => {
        if (!data || typeof data !== "string") return null;
        try {
            const decodedError = CONTRACT_IFACE.parseError(data);
            if (decodedError && decodedError.name) return decodedError.name;
        } catch (err) {}
        
        // Fallback: Check if we have errorSelector in the AST nodes (from compiler output)
        const hexData = data.startsWith("0x") ? data.slice(2) : data;
        const selector = hexData.slice(0, 8);
        const matchedError = CONTRACT_ABI.find(
            (item) => item.errorSelector && item.errorSelector.toLowerCase() === selector.toLowerCase()
        );
        if (matchedError) return matchedError.name;

        return null;
    };

    const possibleDataSources = [
        e.data, e.error?.data, e.error?.error?.data, e.info?.error?.data,
        e.cause?.data, e.transaction?.data, e.receipt?.data
    ];

    for (const data of possibleDataSources) {
        let name = parseErrorData(data);
        if (name) {
            errorName = name;
            break;
        }
    }

    const normalizeErrorName = (name) => {
      if (!name || typeof name !== "string") return name;

      // Handle cases like "execution reverted: AccessDenied" or "revert AccessDenied"
      const byColon = name.split(":").pop().trim();
      const bySpace = byColon.split(" ").pop().trim();
      const match = bySpace.match(/^[A-Za-z0-9_]+$/);

      return match ? bySpace : byColon;
    };

    const messages = {
        "AccessDenied": "You do not have permission to perform this action.",
        "AlreadyVoted": "You have already cast your vote for this poll.",
        "InvalidCandidates": "The list of candidates provided is invalid.",
        "InvalidCredintials": "Invalid credentials provided.",
        "InvalidMaxChoices": "The maximum number of choices is invalid.",
        "InvalidRanking": "The provided candidate ranking is invalid.",
        "InvalidTime": "The specified timeline is invalid.",
        "NoVoteFound": "No prior vote was found.",
        "NoWinnerFound": "Could not compute a winner.",
        "NotAllowedVoter": "You are not an allowed voter for this poll.",
        "NotOrg": "This action requires Organization privileges.",
        "NotOwner": "This action requires Owner privileges.",
        "PollAlreadyFinalized": "This poll has already been finalized.",
        "PollDoesNotExist": "This poll does not exist.",
        "VotingEnded": "Voting for this poll has already finished.",
        "VotingIsNotActive": "Voting is not currently active.",
        "VotingNotEnded": "Voting has not finished yet.",
        "VotingNotStarted": "Voting has not started yet."
    };

    const normalizedName = normalizeErrorName(errorName);
    return messages[normalizedName] || messages[errorName] || errorName || "An unknown blockchain error occurred.";
};

// Public RPC for reading without a wallet
const SEPOLIA_RPC_URL = "https://sepolia.infura.io/v3/bc605433bf354b83a87269063fd5aa97";

const pollIdsCache = new Map();
const pollDetailsCache = new Map();

const getProviderKey = (web3authProvider) => (web3authProvider ? "auth" : "public");

const getProvider = (web3authProvider) => {
  if (web3authProvider) {
    return new ethers.BrowserProvider(web3authProvider);
  }
  return new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
};

export const getPollsFromChain = async (web3authProvider) => {
  const cacheKey = getProviderKey(web3authProvider);
  if (pollIdsCache.has(cacheKey)) {
    return pollIdsCache.get(cacheKey);
  }

  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    const allPollIds = await contract.getAllPolls();
    pollIdsCache.set(cacheKey, allPollIds);
    return allPollIds;
  } catch (error) {
    console.error( getErrorMessage(error));
    return [];
  }
};

export const getPollDetailsFromChain = async (web3authProvider, pollId) => {
  const cacheKey = `${getProviderKey(web3authProvider)}:${pollId}`;
  if (pollDetailsCache.has(cacheKey)) {
    return pollDetailsCache.get(cacheKey);
  }

  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    const [title, startTime, endTime, candidateCount, maxChoices, candidateNames, auditors, creator, voteType, currentState, winnerIndex] = await contract.getPollDetails(pollId);
    const details = {
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
    pollDetailsCache.set(cacheKey, details);
    return details;
  } catch (error) {
    console.error( getErrorMessage(error));
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
    console.error( getErrorMessage(error));
    return "User";
  }
};

export const checkHasUserVoted = async (web3authProvider, pollId, userAddress) => {
  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    return await contract.hasUserVoted(pollId, userAddress);
  } catch (error) {
    console.error( getErrorMessage(error));
    return false;
  }
};

export const checkIsAllowedVoter = async (web3authProvider, pollId, userAddress) => {
  const provider = getProvider(web3authProvider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  try {
    return await contract.isAllowedVoter(pollId, userAddress);
  } catch (error) {
    console.error(getErrorMessage(error));
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
    console.error( getErrorMessage(error));
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
    console.error( getErrorMessage(error));
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
    console.error( getErrorMessage(error));
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
    console.error( getErrorMessage(error));
    return [];
  }
};

