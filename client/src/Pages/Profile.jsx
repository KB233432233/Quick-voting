import React from 'react';
import { Wallet, Mail, Activity, Clock, Copy, CheckCircle2 } from 'lucide-react';
import Navbar from '../Components/Navbar';
import ActivityItem from '../Components/ActivityItem';
import StatCard from '../Components/StatCard';
import { useWeb3 } from '../context/Web3Context';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import ProfileIcon from '../Components/Profile/ProfileIcon';

function Profile() {
    const [copied, setCopied] = React.useState(false);
    const { account } = useWeb3();

    const handleCopy = () => {
        navigator.clipboard.writeText(account);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#F4F6FB] font-sans pb-24 text-slate-800 selection:bg-[#1D58E9]/20 selection:text-[#1D58E9]">
            <Navbar />

            <main className="max-w-[1000px] mx-auto px-6 pt-12">
                <ProfileHeader isVoter={false} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-[24px] border border-slate-100 p-6 flex flex-col items-center shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#1D58E9]/10 to-transparent"></div>

                            <ProfileIcon name={'KB'} email={'email@email.com'} />

                            <h2 className="text-[20px] font-bold text-[#0B1527] mb-1 relative z-10">SatoshiN</h2>
                            <p className="text-[13px] text-[#64748B] mb-6 flex items-center gap-1.5 relative z-10">
                                <Mail className="w-3.5 h-3.5" /> hello@example.com
                            </p>

                            <p className="text-[13px] text-[#64748B] mb-2 flex items-center gap-1.5 relative z-10">Wallet Address</p>

                            <div className="w-full bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl p-3 flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                    <Wallet className="w-4 h-4 text-[#94A3B8]" />
                                    <span className="text-[13px] font-mono font-medium text-[#475569]">{account}</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 hover:bg-[#E2E8F0] rounded-md transition-colors text-[#64748B]"
                                    title="Copy Address"
                                >
                                    {copied ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats & Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <StatCard
                                icon={Activity}
                                label="Total Votes Cast"
                                value="24"
                                trend="+3 this month"
                            />
                        </div>

                        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                                <h3 className="text-[16px] font-bold text-[#0B1527]">Your Activity</h3>
                            </div>
                            <div className="p-2 flex flex-col overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent pr-1">
                                <ActivityItem
                                    icon={CheckCircle2}
                                    title="Voted on Community Fund Allocation Q3"
                                    date="Oct 24, 2026 • 14:30"
                                    status="Active"
                                />
                                <ActivityItem
                                    icon={Clock}
                                    title="Ranked choices for Protocol Upgrade v2.0"
                                    date="Oct 22, 2026 • 09:15"
                                    status="Upcoming"
                                />
                                <ActivityItem
                                    icon={CheckCircle2}
                                    title="Voted on Governance Proposal #42"
                                    date="Oct 10, 2026 • 11:45"
                                    status="Closed"
                                />
                                <ActivityItem
                                    icon={CheckCircle2}
                                    title="Voted on UI Theme Selection"
                                    date="Sep 25, 2026 • 16:20"
                                    status="Closed"
                                />
                                <ActivityItem
                                    icon={CheckCircle2}
                                    title="Voted on Tokenomics Restructuring"
                                    date="Sep 15, 2026 • 10:00"
                                    status="Closed"
                                />
                                <ActivityItem
                                    icon={CheckCircle2}
                                    title="Voted on Emergency Security Patch"
                                    date="Sep 02, 2026 • 18:45"
                                    status="Closed"
                                />
                                <ActivityItem
                                    icon={CheckCircle2}
                                    title="Voted on Validator Node Selection"
                                    date="Aug 28, 2026 • 09:30"
                                    status="Closed"
                                />
                                <ActivityItem
                                    icon={CheckCircle2}
                                    title="Voted on Treasury Diversification"
                                    date="Aug 14, 2026 • 15:15"
                                    status="Closed"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Profile;