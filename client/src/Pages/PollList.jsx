import { useState, useEffect } from 'react';
import { useWeb3Auth } from '@web3auth/modal/react';
import { Zap, Clock, CheckCircle2, Rocket, BarChart3 } from 'lucide-react';
import Navbar from '../Components/Navbar';
import PollCard from '../Components/PollList/PollCard';
import SectionHeader from '../Components/PollList/SectionHeader';
import { getPollsFromChain, getPollDetailsFromChain } from '../hooks/ReadFromChain';
import { Link } from 'react-router';

function PollList() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const { provider } = useWeb3Auth();

  useEffect(() => {
    const fetchAllPolls = async () => {
      try {
        setLoading(true);
        setConnectionStatus("connecting");
        
        // Fetch all IDs using our abstracted hook
        const allPollIds = await getPollsFromChain(provider);
        setConnectionStatus("connected");
        
        // Fetch details for each ID Using our abstracted hook
        const pollsData = await Promise.all(
          allPollIds.map(async (id) => {
            const details = await getPollDetailsFromChain(provider, id);
            return {
              id: id.toString(),
              title: details.title,
              startTime: details.startTime * 1000, // Convert seconds to ms
              endTime: details.endTime * 1000,
              candidateCount: details.candidateCount,
              maxChoices: details.maxChoices,
              candidateNames: details.candidateNames,
              creator: details.creator,
            };
          })
        );

        setPolls(pollsData);
      } catch (err) {
        console.error("Failed to connect or fetch polls:", err);
        setConnectionStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPolls();
  }, [provider]);

  const now = Date.now();
  const activePolls = polls.filter(p => now >= p.startTime && now <= p.endTime);
  const upcomingPolls = polls.filter(p => now < p.startTime);
  const closedPolls = polls.filter(p => now > p.endTime);

  const formatDate = (ts) => new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[#F4F6FB] font-sans pb-24 text-slate-800 selection:bg-[#1D58E9]/20 selection:text-[#1D58E9]">
      <Navbar />

      <main className="max-w-[1000px] mx-auto px-6 pt-12">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-[26px] tracking-tight font-extrabold text-[#0B1527] mb-3">Voting Rounds</h1>
          <p className="text-[14px] text-[#64748B] leading-relaxed pr-8">
            Participate in community decisions. Rank your preferences on active proposals or view past results.
          </p>
        </div>

        {/* Temporary Developer Helper */}
        <div className="mb-4 text-xs font-mono p-3 bg-white rounded border border-gray-200">
            <strong>Connection Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded ${
              connectionStatus === 'connected' ? 'bg-green-100 text-green-800' :
              connectionStatus === 'error' ? 'bg-red-100 text-red-800' :
              connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {connectionStatus.toUpperCase()}
            </span>
        </div>

        {loading ? (
          <div className="text-center py-10 text-[#64748B]">Loading polls from the blockchain...</div>
        ) : (
          <div className="space-y-12">
            {/* Active Polls */}
            <section>
              <SectionHeader
                icon={Zap}
                title="Active Polls"
                badge={`${activePolls.length} Active`}
                iconColor="text-[#1D58E9]"
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activePolls.length > 0 ? activePolls.map(poll => (
                  <PollCard
                    key={poll.id}
                    id={poll.id}
                    status="active"
                    title={poll.title}
                    description={`Candidates: ${poll.candidateNames.join(', ')}. Max choices: ${poll.maxChoices}`}
                    timeRemaining={`Ends ${formatDate(poll.endTime)}`}
                    imageClass="bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,rgba(71,85,105,0.4),transparent)]"
                  />
                )) : <p className="text-[#64748B] text-sm">No active polls found.</p>}
              </div>
            </section>

            {/* Upcoming Polls */}
            <section>
              <SectionHeader
                icon={Clock}
                title="Upcoming Polls"
                iconColor="text-[#64748B]"
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {upcomingPolls.length > 0 ? upcomingPolls.map(poll => (
                  <PollCard
                    key={poll.id}
                    id={poll.id}
                    status="upcoming"
                    icon={Rocket}
                    title={poll.title}
                    description={`Candidates: ${poll.candidateNames.join(', ')}`}
                    timeRemaining={`Starts ${formatDate(poll.startTime)}`}
                  />
                )) : <p className="text-[#64748B] text-sm">No upcoming polls.</p>}
              </div>
            </section>

            {/* Closed Polls */}
            <section>
              <SectionHeader
                icon={CheckCircle2}
                title="Closed Polls"
                iconColor="text-[#64748B]"
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {closedPolls.length > 0 ? closedPolls.map(poll => (
                  <PollCard
                    key={poll.id}
                    id={poll.id}
                    status="closed"
                    icon={BarChart3}
                    title={poll.title}
                    description={`Candidates: ${poll.candidateNames.join(', ')}`}
                    timeRemaining={`Ended ${formatDate(poll.endTime)}`}
                  />
                )) : <p className="text-[#64748B] text-sm">No closed polls yet.</p>}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default PollList;
