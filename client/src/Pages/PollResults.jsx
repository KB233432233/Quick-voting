import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Check,
  ExternalLink
} from 'lucide-react';
import { NavLink } from 'react-router';
import Navbar from '../Components/Navbar';

const chartData = [
  { label: 'Increase Budget', value: 62, color: 'bg-blue-600', height: 'h-48' },
  { label: 'Maintain Budget', value: 30, color: 'bg-slate-300', height: 'h-24' },
  { label: 'Abstain', value: 8, color: 'bg-slate-200', height: 'h-6' },
];

const PollResults = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <Navbar />
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
          <span className="cursor-pointer hover:text-slate-800 transition-colors">Home</span>
          <span className="text-slate-300">/</span>
          <span className="cursor-pointer hover:text-slate-800 transition-colors">Polls</span>
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
              Community Proposal #42: Treasury Allocation
            </h1>
            <p className="text-slate-500 text-base max-w-2xl leading-relaxed mb-8">
              Vote breakdown and final verification details for the Q4 budget planning.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-100 shadow-sm shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Final Results
          </div>
        </div>

        {/* Top Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Left Column: Visual Distribution */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Voting Distribution</h2>
            <p className="text-slate-500 text-sm mb-12">Based on 2,000 confirmed unique wallet signatures</p>

            {/* Simple Bar Chart Visualization */}
            <div className="flex-1 flex items-end justify-center gap-[10%] sm:gap-[15%] pb-8 relative mt-auto px-4 h-64">

              {chartData.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center w-24">
                  {/* Bar */}
                  <div className={`w-full ${item.height} ${item.color} rounded-t-lg transition-all duration-1000 ease-in-out`}></div>
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
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Timestamp</p>
                  <p className="text-xs font-mono text-slate-800">Oct 24, 2023 • 14:02 UTC</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Block Height</p>
                  <a href="#" className="inline-flex items-center gap-1 text-xs font-mono text-blue-600 hover:text-blue-800 transition-colors">
                    18,492,001 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Outcome Card */}
            <div className="bg-[#F0F5FF] rounded-2xl border border-blue-100 p-6">
              <h4 className="text-blue-700 font-bold text-sm mb-3">Outcome Summary</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                The proposal to increase the treasury allocation has passed with a supermajority. The smart contract will execute automatically in 48 hours.
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

                {/* Row 1 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 font-semibold text-slate-800">Increase Budget</td>
                  <td className="px-6 py-5 text-right font-mono text-slate-500">1,240</td>
                  <td className="px-6 py-5 text-right font-bold text-slate-900">62.0%</td>
                  <td className="px-6 py-5">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 font-semibold text-slate-800">Maintain Budget</td>
                  <td className="px-6 py-5 text-right font-mono text-slate-500">600</td>
                  <td className="px-6 py-5 text-right font-bold text-slate-900">30.0%</td>
                  <td className="px-6 py-5">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 font-semibold text-slate-800">Abstain</td>
                  <td className="px-6 py-5 text-right font-mono text-slate-500">160</td>
                  <td className="px-6 py-5 text-right font-bold text-slate-900">8.0%</td>
                  <td className="px-6 py-5">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-300 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </td>
                </tr>

                {/* Total Row */}
                <tr className="bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">Total</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">2,000</td>
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
