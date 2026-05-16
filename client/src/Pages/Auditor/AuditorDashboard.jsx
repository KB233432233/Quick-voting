import { useState, useEffect } from 'react';
import Header from '../../Components/AuditorDashboard/Header';
import PollList from '../../Components/AuditorDashboard/PollList';
import PollDetails from '../../Components/AuditorDashboard/PollDetails';
import { getPollsFromChain, getPollDetailsFromChain, getVotesFromChain } from '../../hooks/ReadFromChain';
import { useWeb3Auth } from '@web3auth/modal/react';

const mapStatus = (stateCode) => {
  // PollState: 0: Created, 1: Active, 2: Ended, 3: Finalized
  switch(Number(stateCode)) {
    case 0: return 'Created';
    case 1: return 'Active';
    case 2: return 'Ended';
    case 3: return 'Completed';
    default: return 'Unknown';
  }
};

const AuditorDashboard = () => {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [polls, setPolls] = useState([]);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { provider } = useWeb3Auth();

  useEffect(() => {
    const fetchAllPolls = async () => {
      setLoading(true);
      const allPollIds = await getPollsFromChain(provider);
      
      const pollPromises = allPollIds.map(async (idStr) => {
        const id = Number(idStr);
        const details = await getPollDetailsFromChain(provider, id);
        return {
          id: id.toString(),
          title: details.title,
          status: mapStatus(details.currentState),
          rawDetails: details
        };
      });

      const loadedPolls = await Promise.all(pollPromises);
      setPolls(loadedPolls.reverse()); // Newest first
      setLoading(false);
    };

    fetchAllPolls();
  }, [provider]);

  // Fetch votes when a specific poll is selected
  useEffect(() => {
    const loadVotes = async () => {
      if (selectedPoll && selectedPoll.rawDetails.currentState >= 2) { 
        // Only Ended or Finalized polls have accessible votes for auditors per contract
        const pollVotes = await getVotesFromChain(provider, Number(selectedPoll.id));
        setVotes(pollVotes);
      } else {
        setVotes([]); // Poll not ended yet
      }
    };
    
    loadVotes();
  }, [selectedPoll, provider]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header />

        {loading ? (
          <div className="text-center py-10">Loading Platform Polls...</div>
        ) : !selectedPoll ? (
          /* Polls List */
          <PollList mockPolls={polls} setSelectedPoll={setSelectedPoll} />
        ) : (
          /* Poll Details / Votes List */
           <PollDetails 
             selectedPoll={{ ...selectedPoll, totalVotes: votes.length }} 
             setSelectedPoll={setSelectedPoll} 
             mockVotes={votes} 
           />
        )}
      </div>
    </div>
  );
};

export default AuditorDashboard;