import React, { useState } from 'react';
import { Vote, Trash2 } from 'lucide-react';

const PollsView = () => {
  const [polls, setPolls] = useState([
    { id: '1', title: 'Student Council Election 2024', status: 'Active' },
    { id: '2', title: 'Curriculum Update Referendum', status: 'Draft' },
    { id: '3', title: 'Facility Improvement Votes', status: 'Completed' },
  ]);

  const handleDelete = (id) => {
    setPolls(polls.filter(poll => poll.id !== id));
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
          {polls.length === 0 ? (
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
                    onClick={() => handleDelete(poll.id)}
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
    </div>
  );
};

export default PollsView;