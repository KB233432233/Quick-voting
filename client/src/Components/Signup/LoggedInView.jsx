import { Link } from "react-router";
import { CheckCircle2, LogOut, ArrowRight } from 'lucide-react';
import { useWeb3AuthDisconnect, useWeb3AuthConnect } from "@web3auth/modal/react";
import { useAccount } from "wagmi";


function LoggedInView() {

    const { connectorName } = useWeb3AuthConnect();
    const { disconnect, loading: disconnectLoading, error: disconnectError } = useWeb3AuthDisconnect();
    const formatAddress = (addr) => addr ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : '';
    const { address } = useAccount();

    return (
        <div className="w-full animate-in fade-in duration-300">
            <div className="w-full bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 mb-6">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span className="text-[13px] font-medium text-[#475569]">Wallet: <span className="font-mono">{formatAddress(address)}</span></span>
            </div>
            <div className="mb-4 text-center">
                <span className="text-sm font-medium text-slate-500">Connected to {connectorName || 'Web3Auth'}</span>
            </div>

            <div className="space-y-3 mb-6">
                <button
                    onClick={() => disconnect()}
                    disabled={disconnectLoading}
                    className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl py-3.5 px-4 font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                    <LogOut className="w-4 h-4" />
                    {disconnectLoading ? 'Disconnecting...' : 'Log Out'}
                </button>
                {disconnectError && <div className="text-rose-500 text-xs mt-1 text-center">{disconnectError.message}</div>}
            </div>

            <div id="console" className="bg-slate-900 rounded-xl p-4 mt-4 overflow-auto max-h-40">
                <p className="text-green-400 font-mono text-xs whitespace-pre-wrap leading-relaxed m-0">{'>'} Ready</p>
            </div>

            <div className="mt-6">
                <Link
                    to="/pollList"
                    className="w-full bg-[#1D58E9] hover:bg-[#1546C6] text-white rounded-xl py-3.5 px-4 font-semibold text-[15px] flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow active:scale-[0.98]"
                >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};


export default LoggedInView;