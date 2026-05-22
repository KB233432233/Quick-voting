import { ethers } from "ethers";

// const CONTRACT_ADDRESS = "0xe16aB1d549de07FA37F757288d63a9B1170e2e88"; //old
const CONTRACT_ADDRESS = "0xd41921474aFfd224678f579eFFc8B34E790f5fA5"; // new
const RPC_URL = "https://sepolia.infura.io/v3/bc605433bf354b83a87269063fd5aa97";
const PRIVATE_KEY = "9efb9c489ec960760e5adb1bcde1dd84a8210ed350583b5c6741bea4f55fdfe3";
const NEW_ORGANIZATION = "0x145cec381eb759B0a0cC5D1EA299b229D4280899";

// const ABI = [{
//     "inputs": [
//         {
//             "internalType": "address",
//             "name": "user",
//             "type": "address"
//         }
//     ],
//     "name": "addOrganization",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
// }, {
//     "inputs": [
//         {
//             "internalType": "address",
//             "name": "user",
//             "type": "address"
//         }
//     ],
//     "name": "getUserRole",
//     "outputs": [
//         {
//             "internalType": "string",
//             "name": "",
//             "type": "string"
//         }
//     ],
//     "stateMutability": "view",
//     "type": "function"
// }, {
//     "inputs": [
//         {
//             "internalType": "uint256",
//             "name": "pollId",
//             "type": "uint256"
//         }
//     ],
//     "name": "finalizePoll",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
// }, {
//     "inputs": [
//         {
//             "internalType": "uint256",
//             "name": "pollId",
//             "type": "uint256"
//         }
//     ],
//     "name": "getVotes",
//     "outputs": [
//         {
//             "internalType": "uint256[][]",
//             "name": "",
//             "type": "uint256[][]"
//         }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//     }, {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "pollId",
//                 "type": "uint256"
//             }
//         ],
//         "name": "getPollDetails",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "title",
//                 "type": "string"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "startTime",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "endTime",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "candidateCount",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "maxChoices",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "string[]",
//                 "name": "candidateNames",
//                 "type": "string[]"
//             },
//             {
//                 "internalType": "address[]",
//                 "name": "auditors",
//                 "type": "address[]"
//             },
//             {
//                 "internalType": "address",
//                 "name": "creator",
//                 "type": "address"
//             },
//             {
//                 "internalType": "enum IRVVoting.VoteType",
//                 "name": "voteType",
//                 "type": "uint8"
//             },
//             {
//                 "internalType": "enum IRVVoting.PollState",
//                 "name": "currentState",
//                 "type": "uint8"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "winnerIndex",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
// {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "user",
//             "type": "address"
//             }
//         ],
//         "name": "addAdmin",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
// {
//     "inputs": [
//         {
//             "internalType": "uint256",
//             "name": "pollId",
//             "type": "uint256"
//         }
//     ],
//     "name": "computeWinner",
//     "outputs": [
//         {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//         }
//     ],
//     "stateMutability": "view",
//     "type": "function"
// }];

const ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "AccessDenied",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "AlreadyVoted",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidCandidates",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidMaxChoices",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidRanking",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidTime",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NoVoteFound",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NoWinnerFound",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotAllowedVoter",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotOrg",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotOwner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "PollAlreadyFinalized",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "PollDoesNotExist",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "VotingEnded",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "VotingIsNotActive",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "VotingNotEnded",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "VotingNotStarted",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "pollId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string[]",
                "name": "candidateNames",
                "type": "string[]"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            }
        ],
        "name": "PollCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "pollId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "winnerIndex",
                "type": "uint256"
            }
        ],
        "name": "PollFinalized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "pollId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            }
        ],
        "name": "PollStarted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "pollId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "round",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "voteCounts",
                "type": "uint256[]"
            }
        ],
        "name": "RoundTally",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "pollId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "voter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "VoteCast",
        "type": "event"
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
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "addAuditor",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "addOrganization",
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
            },
            {
                "internalType": "address[]",
                "name": "newVoters",
                "type": "address[]"
            }
        ],
        "name": "addVotersToWhitelist",
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
        "name": "audit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "checkUpkeep",
        "outputs": [
            {
                "internalType": "bool",
                "name": "upkeepNeeded",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "performData",
                "type": "bytes"
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
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_title",
                "type": "string"
            },
            {
                "internalType": "address[]",
                "name": "_voters",
                "type": "address[]"
            },
            {
                "internalType": "string[]",
                "name": "_candidates",
                "type": "string[]"
            },
            {
                "internalType": "enum IRVVoting.VoteType",
                "name": "_voteType",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "_startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_endTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_maxChoices",
                "type": "uint256"
            }
        ],
        "name": "createPoll",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
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
        "name": "deletePoll",
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
        "name": "finalizePoll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllPolls",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
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
                "internalType": "address[]",
                "name": "auditors",
                "type": "address[]"
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
            },
            {
                "internalType": "uint256",
                "name": "winnerIndex",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "org",
                "type": "address"
            }
        ],
        "name": "getPollsByOrg",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
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
    },
    {
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
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "pollId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "hasUserVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isAdmin",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isAllowedVoter",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isAuditor",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isOrganization",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "performData",
                "type": "bytes"
            }
        ],
        "name": "performUpkeep",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pollCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "pollOrganization",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "pollStarted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
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
        "name": "removeAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "removeAuditor",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "removeOrganization",
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
            },
            {
                "internalType": "uint256[]",
                "name": "ranking",
                "type": "uint256[]"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

// finalize poll
// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

//     const pollId = 1;
//     console.log(`finalizing poll: ${pollId} `);
//     const tx = await contract.computeWinner(pollId);
//     console.log("Transaction sent:", tx.hash);
//     await tx.wait();
//     console.log("✅ poll finalized successfully successfully!");
// }

// adding organization
// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
//     const address = '0xe66f3Fe0C1BC764c916DF1265aCBe5bE28606670' ;
//     console.log(`add org address: ${address} `);
//     const tx = await contract.addOrganization(address);
//     console.log("Transaction sent:", tx.hash);
//     await tx.wait();
//     console.log("✅ added org successfully!");
// }

// add admin
// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
//     const address = '0x6f7BD95A3b70Ec26c8c0A414574E7B460C4F668e' ;
//     console.log(`add admin address: ${address} `);
//     const tx = await contract.addAdmin(address);
//     console.log("Transaction sent:", tx.hash);
//     await tx.wait();
//     console.log("✅ added admin successfully!");
// }

// get user role
// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
//     const address = '0xa165E8326847190FEBD2Ae2E37FFFE991F4fBB37';
//     console.log(`checking user role for: ${address} `);
//     const tx = await contract.getUserRole(address);
//     console.log(`User role: ${tx}`);
// }

// finalize poll
// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

//     const pollId = 5;
//     console.log(`poll: ${pollId}`);

//     // Just call directly - no transaction
//     // const winnerIndex = await contract.computeWinner(pollId);
//     // console.log("Winner index:", winnerIndex);

//     // Get winner name
//     const pollDetails = await contract.getPollDetails(pollId);
//     // const winnerName = pollDetails.candidateNames[winnerIndex];
//     // console.log(`✅ poll Details: ${(pollDetails.winnerIndex !== undefined)?'yes':'no'} `);
//     console.log("End time:", pollDetails.voteType);
//     // console.log("Current block time:", Math.floor(Date.now() / 1000));

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

//     const pollId = 5;
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

// Script to query events
async function getEvents() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    // Get all PollFinalized events
    const finalizedFilter = contract.filters.PollFinalized();
    const finalizedEvents = await contract.queryFilter(finalizedFilter);
    console.log("PollFinalized events:", finalizedEvents);

    // Get all PollStarted events  
    const startedFilter = contract.filters.PollStarted();
    const startedEvents = await contract.queryFilter(startedFilter);
    console.log("PollStarted events:", startedEvents);

    // Get all RoundTally events
    const tallyFilter = contract.filters.RoundTally();
    const tallyEvents = await contract.queryFilter(tallyFilter);
    console.log("RoundTally events:", tallyEvents);
}

getEvents();

// async function main() {
//     const provider = new ethers.JsonRpcProvider(RPC_URL);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

//     const pollId = 6;
//     const details = await contract.getPollDetails(pollId);

//     console.log("Title:", details.title);
//     console.log("Start time:", details.startTime.toString());
//     console.log("End time:", details.endTime.toString());
//     console.log("Candidate count:", details.candidateCount.toString());
//     console.log("Max choices:", details.maxChoices.toString());
//     console.log("Candidate names:", details.candidateNames);
//     console.log("Auditors:", details.auditors);
//     console.log("Creator:", details.creator);
//     console.log("Vote type:", details.voteType);
//     console.log("Current state:", details.currentState);

//     // Fix: Only call toString if winnerIndex exists
//     if (details.winnerIndex !== undefined) {
//         console.log("Winner index:", details.winnerIndex.toString());
//     } else {
//         console.log("Winner index: undefined");
//     }
// }

// main().catch(console.error);
