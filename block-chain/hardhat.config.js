// import viem from "@nomicfoundation/hardhat-viem";
import ethers from "@nomicfoundation/hardhat-ethers";
import "dotenv/config";

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

export default {
  plugins: [ethers],
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    hardhat: {
      type: "edr-simulated",
      chainType: "l1",
    },
    // sepolia: {
    //   url: SEPOLIA_RPC_URL,
    //   accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    //   chainId: 11155111,
    // }
  },
};
