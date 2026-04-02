import React, { useState, useEffect } from 'react';
import { Wallet, ScanLine, HelpCircle, Lock, Vote, CheckCircle2, User, Mail, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useWeb3 } from '../context/Web3Context';

const Signup = () => {
  const { account, connectMetaMask, connectOtherWallets, isConnecting } = useWeb3();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (account) setStep(2);
  }, [account]);

  const formatAddress = (addr) => addr ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : '';
  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/pollList');
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#1D58E9] p-2.5 rounded-xl shadow-md">
          <Vote className="text-white w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B1527]">VoteChain</h1>
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
                {step === 1 ? <Wallet size={20} /> : <User size={20} />}
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-[22px] font-bold text-[#0B1527] mb-3">
              {step === 1 ? 'Connect Your Wallet' : 'Create Profile'}
            </h2>
            <p className="text-[#64748B] text-[15px] leading-relaxed mb-8 px-2">
              {step === 1
                ? 'Connect your wallet securely to participate in the upcoming governance voting session.'
                : 'Choose your username and set up your voter profile for the platform.'}
            </p>
          </div>

          {step === 1 ? (
            <div className="w-full">
              <div className="space-y-3 mb-6">
                <button
                  onClick={connectMetaMask}
                  disabled={isConnecting}
                  className="w-full bg-[#1D58E9] hover:bg-[#1546C6] disabled:opacity-70 disabled:hover:bg-[#1D58E9] text-white rounded-xl py-3.5 px-4 font-semibold text-[15px] flex items-center justify-center gap-3 transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M29.5 11.2c-.3-1.3-1.1-2.4-2.2-3.2-.8-.6-1.8-.9-2.8-.9-.6 0-1.2.1-1.8.3l-1.3.5c-.8.3-1.7.4-2.6.4-1.2 0-2.4-.3-3.5-.8l-1.6-.8c-.8-.4-1.7-.7-2.6-.7-1.1 0-2.3.2-3.3.7-1.1.5-2 1.3-2.6 2.3-.6 1-.9 2.1-.9 3.3 0 1.2.3 2.5 1 3.5.7 1.1 1.7 1.9 2.8 2.4l1.6.7c1.1.5 1.7.9 1.9 1.4.1.3.2.6.2.9 0 1-.6 1.8-1.5 2.2-1 .4-2.1.3-3-.1L4.6 22c-.6-.3-1.1-.3-1.5-.1-.4.2-.6.7-.6 1.3 0 .7.3 1.3.8 1.6l3 1.9c1 .6 2.2 1 3.4 1 1.4 0 2.8-.4 4-1.2l1.6-1.1c1.2-.8 2.7-1.2 4.2-1.2 1.7 0 3.3.5 4.7 1.4 1.2.8 2 2 2.3 3.4.1.6.6 1.1 1.2 1.2.6.1 1.2-.2 1.5-.7l1.7-2.8c.6-1 1-2.2 1-3.4 0-1.2-.3-2.3-1-3.3zM16.5 14.8c-.8.4-1.8.6-2.7.6s-1.9-.2-2.7-.6c-.7-.4-1.3-.9-1.8-1.5-.4-.6-.7-1.3-.7-2.1 0-.9.3-1.8.8-2.5.6-.7 1.3-1.2 2.2-1.6.9-.4 1.8-.5 2.8-.4 1 .2 1.9.6 2.6 1.2.7.6 1.2 1.4 1.5 2.3.2.9.2 1.9-.1 2.8-.3.9-.9 1.7-1.9 2.1z" />
                  </svg>
                  {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                </button>

                <button
                  onClick={connectOtherWallets}
                  disabled={isConnecting}
                  className="w-full bg-white hover:bg-slate-50 disabled:opacity-70 disabled:hover:bg-white border border-[#E2E8F0] text-[#0B1527] rounded-xl py-3.5 px-4 font-semibold text-[15px] flex items-center justify-center gap-3 transition-colors shadow-sm"
                >
                  <ScanLine className="w-5 h-5 text-[#1D58E9]" />
                  WalletConnect
                </button>
              </div>

              <div className="w-full bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl py-2.5 px-4 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[13px] font-medium text-[#475569]">Network: Ethereum Mainnet</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="w-full animate-in fade-in duration-300">
              <div className="w-full bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 mb-6">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span className="text-[13px] font-medium text-[#475569]">Wallet: <span className="font-mono">{formatAddress(account)}</span></span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[#475569] text-[13px] font-semibold mb-1.5">Username</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      required
                      value={profile.username}
                      onChange={e => setProfile({ ...profile, username: e.target.value })}
                      className="w-full bg-white border border-[#E2E8F0] focus:border-[#1D58E9] focus:ring-1 focus:ring-[#1D58E9] rounded-xl py-2.5 pl-10 pr-4 text-[#0B1527] placeholder-[#94A3B8] text-[14px] outline-none transition-all shadow-sm"
                      placeholder="e.g. SatoshiN"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#475569] text-[13px] font-semibold mb-1.5">Email (Optional)</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={e => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-white border border-[#E2E8F0] focus:border-[#1D58E9] focus:ring-1 focus:ring-[#1D58E9] rounded-xl py-2.5 pl-10 pr-4 text-[#0B1527] placeholder-[#94A3B8] text-[14px] outline-none transition-all shadow-sm"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1D58E9] hover:bg-[#1546C6] text-white rounded-xl py-3.5 px-4 font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                Complete Registration
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {step === 1 && (
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
};

export default Signup;
