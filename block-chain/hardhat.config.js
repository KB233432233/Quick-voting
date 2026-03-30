import viem from "@nomicfoundation/hardhat-viem";

export default {
  plugins: [viem],
  solidity: "0.8.20",
  namedAccounts: {
    deployer: {
      default: 0, // This means the first account (index 0) is the "deployer"
    },
  },
  networks: {
    hardhat: {
      type: "edr-simulated",
      chainType: "l1",
    },
  },
};


// import "dotenv/config";
// import "@nomicfoundation/hardhat-toolbox-mocha-ethers";

// export default {
//   solidity: {
//     version: "0.8.28",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },

//   networks: {
//     hardhat: {
//       type: "edr-simulated",
//       chainType: "l1",
//     },

//     // sepolia: {
//     //   type: "http",
//     //   chainType: "l1",
//     //   url: process.env.SEPOLIA_RPC_URL || "",
//     //   accounts: process.env.SEPOLIA_PRIVATE_KEY
//     //     ? [process.env.SEPOLIA_PRIVATE_KEY]
//     //     : [],
//     // },
//   },
// };


//////////////////////////////////////////////////////////////////////
// this worked npx hardhat run scripts/deploy.js --network hardhat///
////////////////////////////////////////////////////////////////////
// import "hardhat-deploy";
// import hardhatToolbox from "@nomicfoundation/hardhat-toolbox-mocha-ethers"; //new tbh

// import "dotenv/config";

// // plugins: [hardhatToolbox], // ✅ THIS LINE IS CRITICAL this was down

// import "@nomicfoundation/hardhat-viem";
// export default {

//   solidity: {
//     version: "0.8.28",
//     namedAccounts: {
//       deployer: {
//         default: 0, // This means the first account (index 0) is the "deployer"
//       },
//     },
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },

//   networks: {
//     hardhat: {
//       type: "edr-simulated",
//       chainType: "l1",
//     },
//   },
// };




// import "dotenv/config";
// // Use the mocha-ethers version for Hardhat 3
// import hardhatToolbox from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

// export default {
//   // CRITICAL: Plugins must be explicitly listed in HH3
//   plugins: [hardhatToolbox],
//   solidity: "0.8.20",
//   networks: {
//     hardhat: {
//       type: "edr-simulated",
//       chainType: "l1",
//     },
//   },
// };




// import "dotenv/config";
// import hardhatToolbox from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
// // import "@nomicfoundation/hardhat-ethers";
// // import "@nomicfoundation/hardhat-toolbox";
// export default {
//   plugins: [hardhatToolbox],

//   solidity: {
//     version: "0.8.20",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },

//   networks: {
//     // 1. Internal Hardhat Network (Default)
//     hardhat: {
//       type: "edr-simulated",
//       chainType: "l1",
//     },

//     // 2. Persistent Local Node (npx hardhat node)
//     localhost: {
//       type: "http", // <--- CRITICAL FOR HH3
//       url: "http://127.0.0.1:8545",
//     },

//     // 3. Sepolia Testnet
//     sepolia: {
//       type: "http", // <--- CRITICAL FOR HH3
//       url: process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/bc605433bf354b83a87269063fd5aa97",
//       accounts: [process.env.PRIVATE_KEY || "9efb9c489ec960760e5adb1bcde1dd84a8210ed350583b5c6741bea4f55fdfe3"],
//       chainId: 11155111,
//     },
//   },

//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY || "BCVTN2VKGU572QY3NGS18QYF87VZYRBGSS",
//   },
// };
