import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x64B366a05827fE8289e93Ae10109ca0581ebb894";
const RPC_URL = "https://sepolia.infura.io/v3/bc605433bf354b83a87269063fd5aa97";
const PRIVATE_KEY = "9efb9c489ec960760e5adb1bcde1dd84a8210ed350583b5c6741bea4f55fdfe3";
const NEW_ORGANIZATION = "0x145cec381eb759B0a0cC5D1EA299b229D4280899";

const ABI = [{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "pollId",
            "type": "uint256"
        }
    ],
    "name": "finalizePoll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [
        {
            "internalType": "uint256",
            "name": "pollId",
            "type": "uint256"
        }
    ],
    "name": "getVotes",
    "outputs": [
        {
            "internalType": "uint256[][]",
            "name": "",
            "type": "uint256[][]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [
        {
            "internalType": "uint256",
            "name": "pollId",
            "type": "uint256"
        }
    ],
    "name": "getPollDetails",
    "outputs": [
        {
            "internalType": "string",
            "name": "title",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "candidateCount",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "maxChoices",
            "type": "uint256"
        },
        {
            "internalType": "string[]",
            "name": "candidateNames",
            "type": "string[]"
        },
        {
            "internalType": "address",
            "name": "creator",
            "type": "address"
        },
        {
            "internalType": "enum IRVVoting.VoteType",
            "name": "voteType",
            "type": "uint8"
        },
        {
            "internalType": "enum IRVVoting.PollState",
            "name": "currentState",
            "type": "uint8"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "pollId",
                "type": "uint256"
            }
        ],
        "name": "computeWinner",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }];


// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

//     const pollId = 3;
//     console.log(`finalizing poll: ${pollId} `);
//     const tx = await contract.finalizePoll(pollId);
//     console.log("Transaction sent:", tx.hash);
//     await tx.wait();
//     console.log("✅ poll finalized successfully successfully!");
// }


async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    const pollId = 3;
    console.log(`compute winner poll: ${pollId}`);

    // Just call directly - no transaction
    const winnerIndex = await contract.computeWinner(pollId);
    console.log("Winner index:", winnerIndex);

    // Get winner name
    const pollDetails = await contract.getPollDetails(pollId);
    const winnerName = pollDetails.candidateNames[winnerIndex];
    console.log(`✅ Winner: ${winnerName} (Index: ${winnerIndex})`);
}

// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

//     const pollId = 2;
//     console.log(`get votes for poll: ${pollId} `);
//     const tx = await contract.getVotes(pollId);
//     console.log("Transaction sent:", tx.hash);
//     await tx.wait();
//     console.log("✅ poll finalized successfully successfully!");
// }

// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

//     const pollId = 2;
//     console.log(`Getting details for poll: ${pollId}`);

//     // getPollDetails is view - no transaction, just direct call
//     const pollDetails = await contract.getPollDetails(pollId);

//     console.log("Title:", pollDetails.title);
//     console.log("Start time:", pollDetails.startTime);
//     console.log("End time:", pollDetails.endTime);
//     console.log("Current state:", pollDetails.currentState);
//     console.log("Vote type:", pollDetails.voteType);
//     console.log("Creator:", pollDetails.creator);

//     // 0=Created, 1=Active, 2=Ended, 3=Finalized
//     const stateNames = ["Created", "Active", "Ended", "Finalized"];
//     console.log(`Poll state: ${stateNames[pollDetails.currentState]}`);

//     if (pollDetails.currentState === 2) {
//         console.log("✅ Voting ended - you can get votes");
//         const votes = await contract.getVotes(pollId);
//         console.log("Votes:", votes);
//     } else {
//         console.log(`❌ Cannot get votes - poll is ${stateNames[pollDetails.currentState]}`);
//     }
// }

main().catch(console.error);
