import { useEffect, useState, useCallback } from 'react';
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
  BarChart2,
  RefreshCw
} from 'lucide-react';
import { getPollDetailsFromChain, getPollsByOrgFromChain } from '../../hooks/ReadFromChain';
import { useWriteOnChain } from '../../hooks/WriteOnChain';

const OrgDashboard = () => {
  const { provider, web3auth } = useWeb3Auth();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const { finalizePoll, addVotersToWhitelist } = useWriteOnChain();
  const [whitelistModalOpen, setWhitelistModalOpen] = useState(false);
  const [whitelistPoll, setWhitelistPoll] = useState(null);
  const [whitelistInput, setWhitelistInput] = useState('');
  const [whitelistFileName, setWhitelistFileName] = useState('');
  const [whitelistError, setWhitelistError] = useState('');
  const [isAddingWhitelist, setIsAddingWhitelist] = useState(false);

  const { address } = useAccount();

  const fetchOrgData = useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      if (!provider && !address) {
        console.log("f");
        return;
      }
      
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
      if (isManualRefresh) {
        setIsRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, [provider, web3auth, address]);

  useEffect(() => {
    fetchOrgData();
  }, [fetchOrgData]);

  const handleFinalize = async (pollId) => {
    try {
      await finalizePoll(pollId);
      alert("Poll Finished!");
      // Optionally trigger reload
    } catch(err) {
      alert("Failed to finalize poll. Make sure the end time has passed.");
    }
  };

  const parseWhitelistInput = (rawText) => {
    return rawText
      .split(/[\r\n,]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((item) => item.toLowerCase());
  };

  const openWhitelistModal = (poll) => {
    setWhitelistPoll(poll);
    setWhitelistInput('');
    setWhitelistFileName('');
    setWhitelistError('');
    setWhitelistModalOpen(true);
  };

  const closeWhitelistModal = (force = false) => {
    if (isAddingWhitelist && !force) return;
    setWhitelistModalOpen(false);
    setWhitelistPoll(null);
    setWhitelistInput('');
    setWhitelistFileName('');
    setWhitelistError('');
  };

  const handleWhitelistFile = (file) => {
    if (!file) return;
    if (!(file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      setWhitelistError('Please upload a valid CSV file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result || '';
      setWhitelistInput(String(csvData));
      setWhitelistFileName(file.name);
      setWhitelistError('');
    };
    reader.readAsText(file);
  };

  const handleAddWhitelist = async () => {
    if (!whitelistPoll) return;
    const now = Math.floor(Date.now() / 1000);
    if (now >= whitelistPoll.startTime) {
      setWhitelistError('This poll has already started. Whitelist changes are locked.');
      return;
    }

    const addresses = parseWhitelistInput(whitelistInput);
    if (addresses.length === 0) {
      setWhitelistError('Please provide at least one wallet address.');
      return;
    }

    try {
      setIsAddingWhitelist(true);
      setWhitelistError('');
      await addVotersToWhitelist(whitelistPoll.id, addresses);
      closeWhitelistModal(true);
    } catch (err) {
      setWhitelistError(err?.message || 'Failed to add voters to the whitelist.');
    } finally {
      setIsAddingWhitelist(false);
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
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fetchOrgData(true)}
            disabled={isRefreshing}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${isRefreshing ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh Polls
          </button>
          <Link 
            to="/createPoll" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all shadow-blue-500/20"
          >
            <PlusCircle size={18} />
            Create New Poll
          </Link>
        </div>
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
                        {status.label === 'Upcoming' && (
                          <button
                            type="button"
                            onClick={() => openWhitelistModal(poll)}
                            className="px-3 py-2 text-xs font-semibold rounded-lg border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                          >
                            Add Whitelist
                          </button>
                        )}
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

      {whitelistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h4 className="text-lg font-semibold text-slate-800">Add Whitelist</h4>
              <button
                type="button"
                onClick={closeWhitelistModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-sm text-slate-500">
                Poll: <span className="font-semibold text-slate-700">{whitelistPoll?.title}</span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Upload CSV (optional)
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleWhitelistFile(e.target.files?.[0])}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                {whitelistFileName && (
                  <div className="text-[11px] text-slate-400 mt-1">Selected: {whitelistFileName}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Paste wallet addresses
                </label>
                <textarea
                  rows={6}
                  value={whitelistInput}
                  onChange={(e) => setWhitelistInput(e.target.value)}
                  placeholder="0xabc...\n0xdef... (comma or newline separated)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-slate-800"
                />
              </div>

              {whitelistError && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {whitelistError}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeWhitelistModal}
                disabled={isAddingWhitelist}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddWhitelist}
                disabled={isAddingWhitelist}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {isAddingWhitelist ? 'Adding...' : 'Add to Whitelist'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgDashboard;