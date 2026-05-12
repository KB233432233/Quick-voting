import React, { useState, useEffect, useCallback } from 'react';
import { Vote, Trash2 } from 'lucide-react';
import Popup from '../../Components/Popup';
import { useWriteOnChain } from '../../hooks/WriteOnChain';
import { getPollsFromChain, getPollDetailsFromChain } from '../../hooks/ReadFromChain';
import { useWeb3Auth } from '@web3auth/modal/react';

const PollsView = () => {
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);

  const { provider } = useWeb3Auth();
  const { deletePoll } = useWriteOnChain();

  const fetchPolls = useCallback(async () => {
    try {
      setIsLoading(true);
      const pollIds = await getPollsFromChain(provider);
      
      const pollsData = await Promise.all(
        pollIds.map(async (id) => {
          const details = await getPollDetailsFromChain(provider, id);
          return {
            id: id.toString(),
            title: details.title,
            status: details.currentState === 0 ? 'Active' : 'Completed',
          };
        })
      );
      setPolls(pollsData);
    } catch (e) {
      console.error("Failed to fetch polls:", e);
    } finally {
      setIsLoading(false);
    }
  }, [provider]);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  const handleDeleteClick = (id) => {
    setSelectedPoll(id);
    setPopupOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPoll) {
      try {
        await deletePoll(selectedPoll);
        setPolls(polls.filter(poll => poll.id !== selectedPoll));
        setPopupOpen(false);
        setSelectedPoll(null);
        alert("Poll deleted successfully.");
      } catch (e) {
        console.error("Failed to delete poll:", e);
        alert("Failed to delete poll on chain.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Vote className="text-indigo-500" />
            Manage Polls
          </h2>
        </div>
        <div className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500">Loading polls...</div>
          ) : polls.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No polls available.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {polls.map(poll => (
                <li key={poll.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <h3 className="font-semibold text-slate-800">{poll.title}</h3>
                    <p className="text-xs text-slate-500">Poll ID: {poll.id} • Status: {poll.status}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteClick(poll.id)}
                    className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2 rounded-lg font-medium transition-colors border border-rose-200"
                  >
                    <Trash2 size={16} />
                    Delete Poll
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Popup 
        isOpen={popupOpen} 
        onClose={() => setPopupOpen(false)}
        title="Delete Poll"
        message="Are you sure you want to delete this poll? This action cannot be undone."
        action="Delete Poll"
        confirmDelete={confirmDelete}
        setPopupOpen={setPopupOpen}
      />
    </div>
  );
};

export default PollsView;