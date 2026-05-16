import { WEB3AUTH_NETWORK } from "@web3auth/modal";

const clientId = import.meta.env.VITE_WEB3AUTH_CLIENT_ID;

const chainConfig = {
    chainNamespace: "eip155",
    chainId: "0xaa36a7", // Sepolia chain ID
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    displayName: "Ethereum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
};

const web3AuthContextConfig = {
    web3AuthOptions: {
        clientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        chainConfig,
    }
};

export default web3AuthContextConfig;