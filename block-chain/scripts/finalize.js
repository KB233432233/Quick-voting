import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xe16aB1d549de07FA37F757288d63a9B1170e2e88";
const RPC_URL = "https://sepolia.infura.io/v3/bc605433bf354b83a87269063fd5aa97";
const PRIVATE_KEY = "9efb9c489ec960760e5adb1bcde1dd84a8210ed350583b5c6741bea4f55fdfe3";
const NEW_ORGANIZATION = "0x145cec381eb759B0a0cC5D1EA299b229D4280899";

const ABI = [{
    "inputs": [
        {
            "internalType": "address",
            "name": "user",
            "type": "address"
        }
    ],
    "name": "addOrganization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [
        {
            "internalType": "address",
            "name": "user",
            "type": "address"
        }
    ],
    "name": "getUserRole",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
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
            "internalType": "address",
            "name": "user",
            "type": "address"
            }
        ],
        "name": "addAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
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

// finalize poll
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

// adding organization
// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
//     const address = '0x145cec381eb759B0a0cC5D1EA299b229D4280899' ;
//     console.log(`add org address: ${address} `);
//     const tx = await contract.addOrganization(address);
//     console.log("Transaction sent:", tx.hash);
//     await tx.wait();
//     console.log("✅ added org successfully!");
// }

// adding admin
// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
//     const address = '0x6f7BD95A3b70Ec26c8c0A414574E7B460C4F668e' ;
//     console.log(`add org address: ${address} `);
//     const tx = await contract.addAdmin(address);
//     console.log("Transaction sent:", tx.hash);
//     await tx.wait();
//     console.log("✅ added admin successfully!");
// }

// get user role
async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
    const address = '0xa165E8326847190FEBD2Ae2E37FFFE991F4fBB37';
    console.log(`checking user role for: ${address} `);
    const tx = await contract.getUserRole(address);
    console.log(`User role: ${tx}`);
}

// finalize poll
// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

//     const pollId = 3;
//     console.log(`compute winner poll: ${pollId}`);

//     // Just call directly - no transaction
//     const winnerIndex = await contract.computeWinner(pollId);
//     console.log("Winner index:", winnerIndex);

//     // Get winner name
//     const pollDetails = await contract.getPollDetails(pollId);
//     const winnerName = pollDetails.candidateNames[winnerIndex];
//     console.log(`✅ Winner: ${winnerName} (Index: ${winnerIndex})`);
// }


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
