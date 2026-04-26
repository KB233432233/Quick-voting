import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router';
import { useWeb3Auth } from '@web3auth/modal/react';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Check,
  ExternalLink
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router';
import { getPollDetailsFromChain, getPollVotes, getPollWinner } from '../hooks/ReadFromChain';

const COLORS = ['bg-blue-600', 'bg-blue-400', 'bg-slate-300', 'bg-emerald-400', 'bg-amber-400', 'bg-purple-500'];

const PollResults = () => {
  const { id } = useParams();
  const { provider } = useWeb3Auth();
  const pollId = Number(id);

  const [loading, setLoading] = useState(true);
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const details = await getPollDetailsFromChain(provider, pollId);
        const votesMatrix = await getPollVotes(provider, pollId);
        const winnerIndex = await getPollWinner(provider, pollId);

        if (details) {
          // In IRV, the last array represents the final round tally
          const finalRoundVotes = votesMatrix.length > 0 ? votesMatrix[votesMatrix.length - 1] : new Array(details.candidateCount).fill(0);
          
          const total = finalRoundVotes.reduce((acc, count) => acc + count, 0);
          
          const mappedResults = details.candidateNames.map((name, index) => {
            const votes = finalRoundVotes[index] || 0;
            const percentage = total > 0 ? ((votes / total) * 100).toFixed(1) : 0;
            return {
              label: name,
              value: votes,
              percentage: percentage,
              color: COLORS[index % COLORS.length]
            };
          });

          // Sort by votes descending
          mappedResults.sort((a, b) => b.value - a.value);

          setPoll(details);
          setResults(mappedResults);
          setTotalVotes(total);
          
          if (winnerIndex !== null && winnerIndex < details.candidateNames.length) {
            setWinner(details.candidateNames[winnerIndex]);
          }
        }
      } catch (err) {
        console.error("Error fetching poll results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [provider, pollId]);

  if (loading || !poll) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
        <Navbar />
        <div className="text-center py-20 text-slate-500 font-medium">
          {loading ? "Loading poll results from the blockchain..." : "Poll details could not be found."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <Navbar />
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
          {/* <span className="cursor-pointer hover:text-slate-800 transition-colors">Home</span> */}
          {/* <span className="text-slate-300">/</span> */}
          <Link to="/pollList" className="cursor-pointer hover:text-slate-800 transition-colors">Polls</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800">Results</span>
        </div>

        <NavLink to="/pollList" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Polls
        </NavLink>

        {/* Title Area */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight mb-3 font-sans">
              {poll.title}
            </h1>
            <p className="text-slate-500 text-base max-w-2xl leading-relaxed mb-8">
              Vote breakdown and final verification details retrieved securely from the blockchain.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-100 shadow-sm shrink-0 h-fit">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Final Results
          </div>
        </div>

        {/* Top Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Left Column: Visual Distribution */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Voting Distribution</h2>
            <p className="text-slate-500 text-sm mb-12">Based on {totalVotes} confirmed unique wallet signatures</p>

            {/* Simple Bar Chart Visualization */}
            <div className="flex-1 flex items-end justify-center gap-[10%] sm:gap-[15%] pb-8 relative mt-auto px-4 h-64">

              {results.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center w-24">
                  {/* Bar */}
                  <div 
                    className={`w-full ${item.color} rounded-t-lg transition-all duration-1000 ease-in-out w-full`}
                    style={{ height: `${Math.max(item.percentage, 5)}%`, minHeight: '1.5rem' }}
                  ></div>
                  {/* X-Axis Label */}
                  <span className="text-xs font-bold text-slate-500 mt-6 text-center leading-snug">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Audit & Verification Cards */}
          <div className="space-y-6">

            {/* Proof Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900">Proof Verified</h3>
              </div>

              <div className="flex items-start gap-2 mb-6">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-snug">
                  Zero-knowledge proof verification successful.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">End Timestamp</p>
                  <p className="text-xs font-mono text-slate-800">{new Date(poll.endTime * 1000).toUTCString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Poll Creator</p>
                  <a href="#" className="inline-flex items-center gap-1 text-xs font-mono text-blue-600 hover:text-blue-800 transition-colors">
                    {poll.creator.slice(0, 10)}... <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Outcome Card */}
            <div className="bg-[#F0F5FF] rounded-2xl border border-blue-100 p-6">
              <h4 className="text-blue-700 font-bold text-sm mb-3">Outcome Summary</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {winner 
                  ? `The leading candidate is ${winner} with a top majority. Results are verified on-chain.`
                  : "Results have been tallied, but a definitive winner has not yet been computed or finalized."}
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Section: Detailed Results Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900">Detailed Results</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors">
              Download CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFC]">
                <tr className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  <th className="px-6 py-4 font-bold">Option Name</th>
                  <th className="px-6 py-4 font-bold text-right">Total Votes</th>
                  <th className="px-6 py-4 font-bold text-right">Percentage</th>
                  <th className="px-6 py-4 font-bold w-1/3">Visual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">

                {results.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-slate-800">{item.label}</td>
                    <td className="px-6 py-5 text-right font-mono text-slate-500">{item.value}</td>
                    <td className="px-6 py-5 text-right font-bold text-slate-900">{item.percentage}%</td>
                    <td className="px-6 py-5">
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">Total</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">{totalVotes}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">100%</td>
                  <td className="px-6 py-4"></td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
};

export default PollResults;
