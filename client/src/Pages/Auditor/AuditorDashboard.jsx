import { useState, useEffect } from 'react';
import Header from '../../Components/AuditorDashboard/Header';
import PollList from '../../Components/AuditorDashboard/PollList';
import PollDetails from '../../Components/AuditorDashboard/PollDetails';
import { getPollsFromChain, getPollDetailsFromChain, getVoteCastEventsFromChain, getVotesFromChain, getWhitelistFromChain } from '../../hooks/ReadFromChain';
import { useWriteOnChain } from '../../hooks/WriteOnChain';
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
  const [whitelistCount, setWhitelistCount] = useState(0);
  const [votedCount, setVotedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAuditing, setIsAuditing] = useState(false);
  const { provider } = useWeb3Auth();
  const { audit } = useWriteOnChain();

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
    const shortenAddress = (address) => {
      if (!address) return "Unknown";
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const formatTimestamp = (unixSeconds) => {
      if (!unixSeconds) return "Unknown";
      const date = new Date(unixSeconds * 1000);
      return date.toLocaleString();
    };

    const loadPollData = async () => {
      if (!selectedPoll) {
        setVotes([]);
        setWhitelistCount(0);
        setVotedCount(0);
        return;
      }

      const pollId = Number(selectedPoll.id);
      const whitelist = await getWhitelistFromChain(provider, pollId);
      setWhitelistCount(whitelist.length);

      const voteEvents = await getVoteCastEventsFromChain(provider, pollId);
      setVotedCount(voteEvents.length);

      let rankings = [];
      if (selectedPoll.rawDetails.currentState >= 2) {
        // Only Ended or Finalized polls have accessible vote rankings for auditors per contract
        // rankings = await getVotesFromChain(provider, pollId);
      }

      const candidateNames = selectedPoll.rawDetails?.candidateNames || [];
      const mappedVotes = voteEvents.map((event, index) => {
        const ranking = rankings[index] || [];
        const rankedNames = ranking.map((candidateIndex) =>
          candidateNames[candidateIndex] || `Candidate #${candidateIndex + 1}`
        );

        return {
          id: event.id,
          voterHash: shortenAddress(event.voter),
          candidate: rankedNames.length > 0 ? rankedNames.join(" > ") : "Rankings hidden",
          timestamp: formatTimestamp(event.timestamp)
        };
      });

      setVotes(mappedVotes);
    };

    loadPollData();
  }, [selectedPoll, provider]);

  const refreshPoll = async (pollId) => {
    const details = await getPollDetailsFromChain(provider, pollId);
    if (!details) return;

    setSelectedPoll((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        title: details.title,
        status: mapStatus(details.currentState),
        rawDetails: details
      };
    });

    setPolls((prev) =>
      prev.map((poll) =>
        poll.id === pollId.toString()
          ? {
              ...poll,
              title: details.title,
              status: mapStatus(details.currentState),
              rawDetails: details
            }
          : poll
      )
    );
  };

  const handleAudit = async () => {
    if (!selectedPoll) return;
    const pollId = Number(selectedPoll.id);

    try {
      setIsAuditing(true);
      await audit(pollId);
      await refreshPoll(pollId);
      alert('Poll audited successfully.');
    } catch (error) {
      alert(error?.message || 'Failed to audit poll.');
    } finally {
      setIsAuditing(false);
    }
  };

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
             selectedPoll={{
               ...selectedPoll,
               totalVotes: votes.length,
               whitelistCount,
               votedCount
             }} 
             setSelectedPoll={setSelectedPoll} 
             mockVotes={votes}
             onAudit={handleAudit}
             isAuditing={isAuditing}
           />
        )}
      </div>
    </div>
  );
};

export default AuditorDashboard;