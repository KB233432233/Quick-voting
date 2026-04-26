import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useWeb3Auth } from '@web3auth/modal/react';
import { getPollDetailsFromChain } from '../hooks/ReadFromChain';
import { useWriteOnChain } from '../hooks/WriteOnChain';

import {
  ChevronRight,
  TrendingUp,
  Droplets,
  Heart,
  Shield,
  Layers,
  GraduationCap,
  Leaf,
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import CandidateCard from '../Components/PollDetails/CandidateCard'
import FloatingBar from '../Components/PollDetails/FloatingBar'
import InfoBanner from '../Components/PollDetails/InfoBanner';
import PollTitle from '../Components/PollDetails/PollTitle';

const PollDetails = () => {
  const { id } = useParams();
  const pollId = Number(id);
  const { provider } = useWeb3Auth();
  const { voteOnPoll } = useWriteOnChain();

  const [loading, setLoading] = useState(true);
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        setLoading(true);
        const details = await getPollDetailsFromChain(provider, pollId);
        if (details) {
          setPoll(details);
        }
      } catch (err) {
        console.error("Failed to load poll:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [provider, pollId]);

  // Icons and styles to assign sequentially
  const metaAssets = [
    { icon: Layers, color: 'text-indigo-400', bg: 'bg-slate-900' },
    { icon: Leaf, color: 'text-emerald-400', bg: 'bg-slate-800' },
    { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: GraduationCap, color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: Droplets, color: 'text-cyan-500', bg: 'bg-cyan-600' },
    { icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  const handleVote = async () => {
    if (selected.length === 0) return alert("Select at least 1 candidate");
    try {
      setIsSubmitting(true);
      
      // In Instant Runoff or Ranked Choice, pass the ranked index array
      // `selected` holds candidate internal ids. We subtract 1 to get index.
      const rankedIndices = selected.map(cid => cid - 1);
      
      await voteOnPoll(pollId, rankedIndices);
      alert("Vote submitted successfully!");
      
    } catch (err) {
      console.error(err);
      alert("Vote failed. See console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSelection = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else if (poll && selected.length < poll.maxChoices) {
      setSelected([...selected, id]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
        <Navbar />
        <div className="text-center py-20 text-slate-500 font-medium">Loading poll details from the blockchain...</div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
        <Navbar />
        <div className="text-center py-20 font-medium text-red-500">Poll not found on the blockchain!</div>
      </div>
    );
  }

  const generatedCandidates = poll.candidateNames.map((name, index) => {
    const asset = metaAssets[index % metaAssets.length];
    return {
      id: index + 1, // 1-based internal id loop
      name: name,
      description: 'Blockchain Candidate Entry',
      requested: '-',
      meta: 'On-Chain Option',
      metaIcon: null,
      metaColor: 'text-slate-500',
      icon: asset.icon,
      iconColor: asset.color,
      iconBg: asset.bg,
    };
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">


        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 transition-colors">
            <div className="w-3 h-3 bg-slate-400 rounded-sm"></div> Polls
          </span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800">{poll.title}</span>
        </div>

        <PollTitle
          title={poll.title}
          desc={`This poll allows a maximum of ${poll.maxChoices} choices. Please rank your preferences by clicking on the cards below. The top choice receives the highest weight.`}
        />

        <InfoBanner 
          startDate={new Date(poll.startTime).toLocaleDateString()} 
          endDate={new Date(poll.endTime).toLocaleDateString()} 
          votingType={poll.voteType} 
        />

        {/* Candidates Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Candidates</h2>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{poll.candidateCount} Projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedCandidates.map((candidate) => {
            const isSelected = selected.includes(candidate.id);
            const rankIndex = selected.indexOf(candidate.id) + 1;

            return (
              <CandidateCard
                key={candidate.id}
                toggleSelection={toggleSelection}
                candidate={candidate}
                isSelected={isSelected}
                rankIndex={rankIndex}
              />
            );
          })}
        </div>
      </main>
      
      {/* Floating Bar with updated Vote Handler */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none">
        <div className="bg-[#0f172a] p-4 rounded-2xl shadow-2xl flex items-center justify-between pointer-events-auto border border-white/10 relative overflow-hidden backdrop-blur-xl bg-[#0f172a]/95">
          <div className="flex gap-4">
              {Array.from({ length: poll.maxChoices }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 w-16">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 
                  ${selected[i] ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] ring-2 ring-indigo-400 ring-offset-2 ring-offset-[#0f172a]' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                    {selected[i] ? selected[i] : i + 1}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{['1st', '2nd', '3rd', '4th', '5th'][i] || `${i + 1}th`}</span>
                </div>
              ))}
          </div>

          <button 
            onClick={handleVote}
            disabled={selected.length === 0 || isSubmitting}
            className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2
            ${selected.length > 0 && !isSubmitting ? 'bg-white text-slate-900 hover:bg-slate-100 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
          >
            {isSubmitting ? "Voting..." : "Submit Cast"} 
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollDetails;
