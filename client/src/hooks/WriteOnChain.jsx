import { ethers } from "ethers";
import { useWeb3Auth } from "@web3auth/modal/react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../context/constants";

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
            throw e;
        }
    };

    // Creates a new poll
    const createNewPoll = async (pollData) => {
        try {
            const votingContract = await getContract();
            
            const { 
                title, 
                candidateAddresses, 
                candidateNames, 
                auditorAddresses, 
                voteType, 
                startTime, 
                endTime, 
                maxChoices 
            } = pollData;

            const tx = await votingContract.createPoll(
                title,
                candidateAddresses,
                candidateNames,
                auditorAddresses,
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
            throw e;
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
            throw e;
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
            throw e;
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
            console.error("Failed to add voters to whitelist:", e);
            throw e;
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
            console.error("Failed to delete poll:", e);
            throw e;
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
            throw e;
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
            throw e;
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
            throw e;
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
            throw e;
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
            throw e;
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
            throw e;
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
