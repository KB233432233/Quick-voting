import { useEffect, useState } from 'react';
import { useWeb3Auth } from '@web3auth/modal/react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { Link } from 'react-router';
import { 
  Vote, 
  Users, 
  PlusCircle, 
  Loader2, 
  CheckCircle2, 
  Clock, 
  BarChart2 
} from 'lucide-react';
import { getPollDetailsFromChain, getPollsByOrgFromChain } from '../../hooks/ReadFromChain';
import { useWriteOnChain } from '../../hooks/WriteOnChain';

const OrgDashboard = () => {
  const { provider, web3auth } = useWeb3Auth();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState("");
  const { finalizePoll } = useWriteOnChain();

  const { address } = useAccount();

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        if (!provider && !address) {console.log("f"); return;}
        
        let currentAddress = address;

        if (provider && web3auth) {
          try {
            const userInfo = await web3auth.getUserInfo();
          } catch (e) {
            console.log("Could not get user info, might be external wallet");
          }
          const ethersProvider = new ethers.BrowserProvider(provider);
          const signer = await ethersProvider.getSigner();
          currentAddress = await signer.getAddress();
        }
        
        if (currentAddress) {
          setUserAddress(currentAddress);
          
          // 2. Fetch polls owned by this organization
          const pollIds = await getPollsByOrgFromChain(provider, currentAddress);
          
          // 3. Fetch details for each poll
          const pollDetailsPromises = pollIds.map(async (id) => {
            const details = await getPollDetailsFromChain(provider, id);
            return { id, ...details };
          });

          const orgPolls = await Promise.all(pollDetailsPromises);
          setPolls(orgPolls);
        }
      } catch (err) {
        console.error("Failed to load org dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgData();
  }, [provider, web3auth, address]);

  const handleFinalize = async (pollId) => {
    try {
      await finalizePoll(pollId);
      alert("Poll Finished!");
      // Optionally trigger reload
    } catch(err) {
      alert("Failed to finalize poll. Make sure the end time has passed.");
    }
  };

  const getPollStatus = (poll) => {
    const now = Math.floor(Date.now() / 1000);
    if (now < poll.startTime) return { label: 'Upcoming', color: 'text-amber-500 bg-amber-50 border-amber-200' };
    if (now > poll.endTime) return { label: 'Ended', color: 'text-slate-500 bg-slate-50 border-slate-200' };
    return { label: 'Active', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Organization Portal</h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Manage your elections, audit voter whitelists, and finalize polls from your secure command center.
          </p>
          <div className="mt-3 text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded inline-block">
            Wallet: {userAddress || "Not connected"}
          </div>
        </div>
        <Link 
          to="/createPoll" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all shadow-blue-500/20"
        >
          <PlusCircle size={18} />
          Create New Poll
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Vote size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Polls</p>
            <p className="text-2xl font-bold text-slate-800">{polls.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Elections</p>
            <p className="text-2xl font-bold text-slate-800">
              {polls.filter(p => {
                const now = Math.floor(Date.now() / 1000);
                return now >= p.startTime && now <= p.endTime;
              }).length}
            </p>
          </div>
        </div>
      </div>

      {/* Poll Management Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-lg">Your Elections</h3>
        </div>
        
        {polls.length === 0 ? (
          <div className="p-8 justify-center flex flex-col items-center text-slate-400">
            <Clock size={40} className="mb-3 text-slate-300" />
            <p>You haven't created any polls yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Poll Title</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-center">Candidates</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {polls.map((poll) => {
                   const status = getPollStatus(poll);
                   
                   return (
                    <tr key={poll.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {poll.title}
                        <div className="text-xs text-slate-400 font-normal mt-0.5">
                          ID: {poll.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-slate-600">
                        {poll.candidateCount}
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        <Link 
                          to={`/pollDetails/${poll.id}`}
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                          title="View Details"
                        >
                          <BarChart2 size={16} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgDashboard;