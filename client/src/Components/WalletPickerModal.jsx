import { X, Wallet } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';

const WalletPickerModal = () => {
    const {
        discoveredWallets,
        connectEIP6963Wallet,
        showWalletModal,
        setShowWalletModal,
        isConnecting
    } = useWeb3();

    if (!showWalletModal) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
            onClick={() => setShowWalletModal(false)}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-[380px] overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                    <div>
                        <h3 className="text-[17px] font-bold text-[#0B1527]">Connect Wallet</h3>
                        <p className="text-[12px] text-[#94A3B8] mt-0.5">Choose your wallet to continue</p>
                    </div>
                    <button
                        onClick={() => setShowWalletModal(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        <X className="w-4 h-4 text-slate-500" />
                    </button>
                </div>

                {/* Wallet List */}
                <div className="px-4 py-4 space-y-2 max-h-72 overflow-y-auto">
                    {discoveredWallets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-3">
                                <Wallet className="w-6 h-6 text-[#94A3B8]" />
                            </div>
                            <p className="text-[14px] font-semibold text-slate-700">No wallets detected</p>
                            <p className="text-[12px] text-[#94A3B8] mt-1 leading-relaxed max-w-[220px]">
                                Install a browser wallet extension like MetaMask, Coinbase, or Brave Wallet.
                            </p>
                        </div>
                    ) : (
                        discoveredWallets.map((wallet) => (
                            <button
                                key={wallet.info.uuid}
                                onClick={() => connectEIP6963Wallet(wallet)}
                                disabled={isConnecting}
                                className="w-full flex items-center gap-4 p-3.5 rounded-2xl border border-slate-100 hover:bg-[#F8FAFC] hover:border-[#1D58E9]/20 transition-all group disabled:opacity-50"
                            >
                                <img
                                    src={wallet.info.icon}
                                    alt={wallet.info.name}
                                    className="w-10 h-10 rounded-xl object-contain"
                                />
                                <div className="text-left">
                                    <p className="text-[14px] font-semibold text-[#0B1527] group-hover:text-[#1D58E9] transition-colors">
                                        {wallet.info.name}
                                    </p>
                                    <p className="text-[11px] text-[#94A3B8]">Click to connect</p>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-[#F8FAFC]">
                    <p className="text-[11px] text-[#94A3B8] text-center leading-relaxed">
                        By connecting, you agree to our Terms of Service. We only request view permissions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WalletPickerModal;
