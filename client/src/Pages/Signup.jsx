import { useWeb3AuthConnect } from "@web3auth/modal/react";
import LoggedInView from "../Components/Signup/LoggedInView";
import UnLoggedInView from "../Components/Signup/UnLoggedInView";
import { Wallet, HelpCircle, Lock, Vote, User } from 'lucide-react';

function Signup() {
  const { isConnected } = useWeb3AuthConnect();

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#1D58E9] p-2.5 rounded-xl shadow-md">
          <Vote className="text-white w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B1527]">QuickVote</h1>
      </div>

      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        {/* Banner area */}
        <div className="h-44 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden flex flex-col items-center justify-end pb-0">
          <div className="absolute inset-0 opacity-60 mix-blend-screen"
            style={{
              background: 'radial-gradient(circle at 50% 100%, rgba(138, 203, 255, 0.4) 0%, transparent 60%), linear-gradient(0deg, rgba(200, 240, 255, 0.8) 0%, transparent 60%)'
            }}
          ></div>
          <div className="absolute top-0 right-0 w-full h-full opacity-20"
            style={{
              background: 'repeating-linear-gradient(25deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 11px)'
            }}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent mix-blend-normal z-10"></div>
        </div>

        <div className="px-8 pb-8 flex flex-col relative z-20 -mt-10">
          <div className="flex justify-center w-full">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-5 relative z-20">
              <div className="bg-[#EBF1FF] text-[#1D58E9] w-10 h-10 rounded-full flex items-center justify-center">
                {!isConnected ? <Wallet size={20} /> : <User size={20} />}
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-[22px] font-bold text-[#0B1527] mb-3">
              {!isConnected ? 'Connect Your Wallet' : 'Dashboard Profile'}
            </h2>
            <p className="text-[#64748B] text-[15px] leading-relaxed mb-8 px-2">
              {!isConnected
                ? 'Connect your wallet securely to participate in the upcoming governance voting session.'
                : 'Welcome to quick voting system'}
            </p>
          </div>

          {isConnected ? <LoggedInView /> : <UnLoggedInView />}
        </div>

        {!isConnected && (
          <div className="bg-[#F8FAFC] border-t border-[#F1F5F9] px-8 py-5 text-center w-full">
            <p className="text-[12px] text-[#94A3B8] leading-relaxed">
              By connecting, you agree to our <a href="#" className="underline hover:text-[#475569] transition-colors">Terms of Service</a>. We only request view permissions.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-6 mt-8 text-[#64748B] text-[13px] font-medium w-full">
        <a href="#" className="flex items-center gap-1.5 hover:text-[#0B1527] transition-colors">
          <HelpCircle size={14} /> Need help?
        </a>
        <a href="#" className="flex items-center gap-1.5 hover:text-[#0B1527] transition-colors">
          <Lock size={14} /> Privacy Policy
        </a>
      </div>
    </div>
  );
}

export default Signup;