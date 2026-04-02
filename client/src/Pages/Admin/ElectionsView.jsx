import React, { useState } from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Settings,
  BarChart3,
  Users,
  ChevronRight,
  Activity,
  Plus
} from 'lucide-react';

// View B: "Elections" (Election Commission View)
const ElectionsView = () => {
  const [activePoll, setActivePoll] = useState(null); // Used to toggle between List and Detail view

  const mockPolls = [
    { id: 'POLL-001', title: 'Student Council 2024', status: 'Active', start: 'Oct 25', end: 'Nov 01', type: 'Ranked Choice' },
    { id: 'POLL-002', title: 'Curriculum Update Referendum', status: 'Draft', start: 'Dec 01', end: 'Dec 15', type: 'Simple Majority' },
    { id: 'POLL-003', title: 'Facility Improvement Votes', status: 'Completed', start: 'Sep 10', end: 'Sep 20', type: 'Approval Voting' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'Draft': return 'bg-slate-100 text-slate-600 border border-slate-200';
      case 'Completed': return 'bg-indigo-50 text-indigo-600 border border-indigo-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  // Renders the sub-view for a specific election
  if (activePoll) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
        {/* Detail Header */}
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2 cursor-pointer" onClick={() => setActivePoll(null)}>
          <span className="hover:text-indigo-600 transition">Elections</span>
          <ChevronRight size={14} />
          <span className="text-slate-800">{activePoll.title}</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{activePoll.title}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(activePoll.status)}`}>
                  {activePoll.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">{activePoll.id} • {activePoll.type}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition shadow-sm">Edit Configuration</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">Publish Results</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Meta Data Panel */}
            <div className="p-6">
              <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                <Settings size={18} className="text-slate-400" />
                Poll Metadata
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Description</label>
                  <textarea className="w-full text-sm border-0 bg-slate-50 rounded-lg p-3 text-slate-700 resize-none focus:ring-2 focus:ring-indigo-500" rows="3" defaultValue="Annual voting for student body representation including President, Vice President, and Senate." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Start Date</label>
                    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-sm text-slate-700">
                      <Calendar size={14} className="text-slate-400" /> {activePoll.start}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">End Date</label>
                    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-sm text-slate-700">
                      <Calendar size={14} className="text-slate-400" /> {activePoll.end}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidates Management Panel */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="flex items-center gap-2 font-semibold text-slate-800">
                  <Users size={18} className="text-slate-400" />
                  Candidate Roster
                </h3>
                <button className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold flex items-center gap-1">
                  <Plus size={14} /> Add Candidate
                </button>
              </div>
              <ul className="space-y-3">
                {[
                  { name: 'Alex Johnson', role: 'Presidential Candidate' },
                  { name: 'Sarah Williams', role: 'Presidential Candidate' },
                  { name: 'Michael Chen', role: 'Vice President' }
                ].map((c, i) => (
                  <li key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white shadow-sm hover:border-indigo-200 transition group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs uppercase">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 leading-tight">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.role}</p>
                      </div>
                    </div>
                    <MoreHorizontal size={16} className="text-slate-300 group-hover:text-slate-500" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Results Panel */}
            <div className="p-6 bg-slate-50/50">
              <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">
                <BarChart3 size={18} className="text-slate-400" />
                Live Tally Results
              </h3>

              <div className="space-y-4">
                {[
                  { name: 'Alex Johnson', votes: 450, total: 1000, color: 'bg-indigo-500' },
                  { name: 'Sarah Williams', votes: 320, total: 1000, color: 'bg-blue-400' },
                  { name: 'Michael Chen', votes: 230, total: 1000, color: 'bg-slate-400' }
                ].map((res, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{res.name}</span>
                      <span>{res.votes} votes</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${res.color} rounded-full transition-all duration-1000`} style={{ width: `${(res.votes / res.total) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-700 flex items-start gap-2">
                <Activity size={16} className="mt-0.5 shrink-0" />
                <p>Tally is computed in real-time leveraging Zero-Knowledge proofs to maintain ballot secrecy while verifying sums.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Election Management</h2>
          <p className="text-sm text-slate-500">Oversee the lifecycle of all voting processes.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search polls..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm w-fit">
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100 uppercase text-[10px] font-bold tracking-wider text-slate-500">
                <th className="px-6 py-4">Poll Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPolls.map((poll) => (
                <tr
                  key={poll.id}
                  onClick={() => setActivePoll(poll)}
                  className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{poll.title}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{poll.id}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{poll.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      {poll.start} - {poll.end}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(poll.status)}`}>
                      {poll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ElectionsView;
