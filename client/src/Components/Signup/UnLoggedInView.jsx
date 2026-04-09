import { useWeb3AuthConnect } from "@web3auth/modal/react";


function UnLoggedInView() {

    const { connect, loading: connectLoading, error: connectError } = useWeb3AuthConnect();

    return (
        <div className="w-full animate-in fade-in duration-300">
            <div className="space-y-3 mb-6">
                <button
                    onClick={() => connect()}
                    disabled={connectLoading}
                    className="w-full bg-[#1D58E9] hover:bg-[#1546C6] disabled:opacity-70 disabled:hover:bg-[#1D58E9] text-white rounded-xl py-3.5 px-4 font-semibold text-[15px] flex items-center justify-center gap-3 transition-colors shadow-sm"
                >
                    <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="currentColor">
                        <path d="M29.5 11.2c-.3-1.3-1.1-2.4-2.2-3.2-.8-.6-1.8-.9-2.8-.9-.6 0-1.2.1-1.8.3l-1.3.5c-.8.3-1.7.4-2.6.4-1.2 0-2.4-.3-3.5-.8l-1.6-.8c-.8-.4-1.7-.7-2.6-.7-1.1 0-2.3.2-3.3.7-1.1.5-2 1.3-2.6 2.3-.6 1-.9 2.1-.9 3.3 0 1.2.3 2.5 1 3.5.7 1.1 1.7 1.9 2.8 2.4l1.6.7c1.1.5 1.7.9 1.9 1.4.1.3.2.6.2.9 0 1-.6 1.8-1.5 2.2-1 .4-2.1.3-3-.1L4.6 22c-.6-.3-1.1-.3-1.5-.1-.4.2-.6.7-.6 1.3 0 .7.3 1.3.8 1.6l3 1.9c1 .6 2.2 1 3.4 1 1.4 0 2.8-.4 4-1.2l1.6-1.1c1.2-.8 2.7-1.2 4.2-1.2 1.7 0 3.3.5 4.7 1.4 1.2.8 2 2 2.3 3.4.1.6.6 1.1 1.2 1.2.6.1 1.2-.2 1.5-.7l1.7-2.8c.6-1 1-2.2 1-3.4 0-1.2-.3-2.3-1-3.3zM16.5 14.8c-.8.4-1.8.6-2.7.6s-1.9-.2-2.7-.6c-.7-.4-1.3-.9-1.8-1.5-.4-.6-.7-1.3-.7-2.1 0-.9.3-1.8.8-2.5.6-.7 1.3-1.2 2.2-1.6.9-.4 1.8-.5 2.8-.4 1 .2 1.9.6 2.6 1.2.7.6 1.2 1.4 1.5 2.3.2.9.2 1.9-.1 2.8-.3.9-.9 1.7-1.9 2.1z" />
                    </svg>
                    {connectLoading ? 'Connecting...' : 'Login with Web3Auth'}
                </button>
                {connectError && <div className="text-rose-500 text-xs mt-2 text-center">{connectError.message}</div>}
            </div>
        </div>
    );
}

export default UnLoggedInView