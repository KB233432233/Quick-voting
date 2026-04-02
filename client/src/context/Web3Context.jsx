import { createContext, useState, useEffect, useContext } from 'react';
import { BrowserProvider } from 'ethers';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [discoveredWallets, setDiscoveredWallets] = useState([]);
    const [showWalletModal, setShowWalletModal] = useState(false);

    // EIP-6963: Discover all installed wallet browser extensions
    useEffect(() => {
        const handleAnnounceProvider = (event) => {
            setDiscoveredWallets(prev => {
                const exists = prev.find(w => w.info.uuid === event.detail.info.uuid);
                return exists ? prev : [...prev, event.detail];
            });
        };

        window.addEventListener('eip6963:announceProvider', handleAnnounceProvider);
        // Ask all wallets to announce themselves
        window.dispatchEvent(new Event('eip6963:requestProvider'));

        return () => {
            window.removeEventListener('eip6963:announceProvider', handleAnnounceProvider);
        };
    }, []);

    // Listen for MetaMask / injected account changes
    useEffect(() => {
        if (!window.ethereum) return;
        const handleAccountsChanged = (accounts) => {
            setAccount(accounts.length > 0 ? accounts[0] : null);
        };
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', () => window.location.reload());
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);

    // Button 1: MetaMask / injected direct connection
    const connectMetaMask = async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask!');
            return;
        }
        try {
            setIsConnecting(true);
            const browserProvider = new BrowserProvider(window.ethereum);
            await browserProvider.send('eth_requestAccounts', []);
            const signer = await browserProvider.getSigner();
            const address = await signer.getAddress();
            setProvider(browserProvider);
            setAccount(address);
        } catch (error) {
            console.error('MetaMask connection failed:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    // Button 2: Other wallets — shows the EIP-6963 picker modal
    const connectOtherWallets = () => {
        setShowWalletModal(true);
    };

    // Called when user picks a wallet from the modal
    const connectEIP6963Wallet = async (walletDetail) => {
        try {
            setIsConnecting(true);
            const browserProvider = new BrowserProvider(walletDetail.provider);
            await browserProvider.send('eth_requestAccounts', []);
            const signer = await browserProvider.getSigner();
            const address = await signer.getAddress();
            setProvider(browserProvider);
            setAccount(address);
            setShowWalletModal(false);
        } catch (error) {
            console.error('Wallet connection failed:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setProvider(null);
    };

    return (
        <Web3Context.Provider value={{
            account,
            provider,
            isConnecting,
            connectMetaMask,
            connectOtherWallets,
            connectEIP6963Wallet,
            discoveredWallets,
            showWalletModal,
            setShowWalletModal,
            disconnectWallet
        }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);
