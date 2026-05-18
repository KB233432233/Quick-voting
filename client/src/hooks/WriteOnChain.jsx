import { ethers } from "ethers";
import { useWeb3Auth } from "@web3auth/modal/react";
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
            if (decodedError && decodedError.name) {
                return decodedError.name;
            }
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
        e.data,
        e.error?.data,
        e.error?.error?.data,
        e.info?.error?.data,
        e.cause?.data,
        e.transaction?.data,
        e.receipt?.data
    ];

    for (const data of possibleDataSources) {
        let name = parseErrorData(data);
        if (name) {
            errorName = name;
            break;
        }
    }

    const messages = {
        "AccessDenied": "You do not have permission to perform this action.",
        "AlreadyVoted": "You have already cast your vote for this poll.",
        "InvalidCandidates": "The list of candidates provided is invalid.",
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

    // Return the mapped message if it exists, otherwise provide a fallback
    return messages[errorName] || errorName || "An unknown blockchain error occurred.";
};

export const useWriteOnChain = () => {
    const { provider: web3authProvider } = useWeb3Auth();

    // Internal helper to initialize the contract instance
    const getContract = async () => {
        if (!web3authProvider) {
            throw new Error("User not connected");
        }
        const provider = new ethers.BrowserProvider(web3authProvider);
        const signer = await provider.getSigner();
        return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    };

    // Submits a vote to a specific poll
    const voteOnPoll = async (pollId, rankingList) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.vote(pollId, rankingList);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Vote Transaction successful!", receipt.hash);
            
            return receipt;
        } catch (e) {
            console.error("Vote Tx failed:", e);
            const message = getErrorMessage(e);
            throw new Error(message);
        }
    };

    // Creates a new poll
    const createNewPoll = async (pollData) => {
        try {
            const votingContract = await getContract();
            
            const { 
                title, 
                voters, 
                candidateNames, 
                voteType, 
                startTime, 
                endTime, 
                maxChoices 
            } = pollData;

            const tx = await votingContract.createPoll(
                title,
                voters, // _voters (address array)
                candidateNames, // _candidates (string array)
                voteType,
                startTime,
                endTime,
                maxChoices
            );
            
            console.log("Transaction dispatched! Waiting for confirmation...");
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Poll created successfully!", receipt.hash);
            
            return receipt;
            
        } catch (e) {
            console.error("Failed to create poll:", e);
            const message = getErrorMessage(e);
            throw new Error(message);
        }
    };

    // Adds a new organization (Note: caller must have the appropriate role on the contract)
    const addOrganization = async (orgAddress) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.addOrganization(orgAddress);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Organization added successfully!", receipt.hash);
            
            return receipt;
            
        } catch (e) {
            console.error("Failed to add organization:", e);
            const message = getErrorMessage(e);
            throw new Error(message);
        }
    };

    // Finalizes a poll
    const finalizePoll = async (pollId) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.finalizePoll(pollId);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Poll finalized successfully!", receipt.hash);
            
            return receipt;
            
        } catch (e) {
            console.error("Failed to finalize poll:", e);
            const message = getErrorMessage(e);
            throw new Error(message);
        }
    };

    // Adds voters to a poll's whitelist
    const addVotersToWhitelist = async (pollId, newVoters) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.addVotersToWhitelist(pollId, newVoters);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Voters added to whitelist successfully!", receipt.hash);
            
            return receipt;
            
        } catch (e) {
            const message = getErrorMessage(e);
            console.error("Failed to add voters to whitelist:", e);
            throw new Error(message);
        }
    };

    const deletePoll = async (pollId) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.deletePoll(pollId);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Poll deleted successfully!", receipt.hash);
            
            return receipt;
            
            } catch (e) {
                const message = getErrorMessage(e);
                console.error("Failed to delete poll:", e);
                throw new Error(message);
        }
    };

    const audit = async (pollId) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.audit(pollId);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Poll audited successfully!", receipt.hash);
            
            return receipt;
            
        } catch (e) {
            console.error("Failed to audit poll:", e);
            const message = getErrorMessage(e);
            throw new Error(message);
        }
    };

    const removeOrganization = async (orgAddress) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.removeOrganization(orgAddress);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Organization removed successfully!", receipt.hash);
            
            return receipt;
            
        } catch (e) {
            console.error("Failed to remove organization:", e);
            const message = getErrorMessage(e);
            throw new Error(message);
        }
    };

    const addAdmin = async (adminAddress) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.addAdmin(adminAddress);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Admin added successfully!", receipt.hash);
            
            return receipt;
            
        } catch (e) {
            console.error("Failed to add admin:", e);
            const message = getErrorMessage(e);
            throw new Error(message);
        }
    };

    const removeAdmin = async (adminAddress) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.removeAdmin(adminAddress);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Admin removed successfully!", receipt.hash);
            
            return receipt;
            
        } catch (e) {
            console.error("Failed to remove admin:", e);
            const message = getErrorMessage(e);
            throw new Error(message);
        }
    };

    const addAuditor = async (auditorAddress) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.addAuditor(auditorAddress);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Auditor added successfully!", receipt.hash);
            
            return receipt;
            
        } catch (e) {
            console.error("Failed to add auditor:", e);
            const message = getErrorMessage(e);
            throw new Error(message);
        }
    };

    const removeAuditor = async (auditorAddress) => {
        try {
            const votingContract = await getContract();
            
            const tx = await votingContract.removeAuditor(auditorAddress);
            console.log("Transaction dispatched! Waiting for confirmation...");
            
            const receipt = await tx.wait(); // Wait for the block to be mined
            console.log("Auditor removed successfully!", receipt.hash);
            
            return receipt;
            
        } catch (e) {
            console.error("Failed to remove auditor:", e);
            const message = getErrorMessage(e);
            throw new Error(message);
        }
    };

    return { 
        voteOnPoll, 
        createNewPoll, 
        addOrganization, 
        finalizePoll, 
        addVotersToWhitelist, 
        deletePoll, 
        audit, 
        removeOrganization, 
        addAdmin, 
        removeAdmin, 
        addAuditor, 
        removeAuditor 
    };
};
