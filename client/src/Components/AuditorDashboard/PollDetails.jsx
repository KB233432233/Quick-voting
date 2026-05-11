import { ChevronLeft, Hash, User, Clock } from "lucide-react"

function PollDetails({ selectedPoll, setSelectedPoll, mockVotes }) {
  return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <button 
              onClick={() => setSelectedPoll(null)}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-emerald-600 transition"
            >
              <ChevronLeft size={16} /> Back to Polls
            </button>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">{selectedPoll.title}</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">Poll ID: #{selectedPoll.id}</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-center">
                  <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">Total Valid Votes</p>
                  <p className="text-2xl font-black leading-none mt-1">{selectedPoll.totalVotes}</p>
                </div>
              </div>

              <div className="flex-1 overflow-auto bg-white">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white border-b border-slate-100 z-10 sticky top-0">
                    <tr className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      <th className="px-6 py-4">Transaction / Receipt ID</th>
                      <th className="px-6 py-4">Voter Alias</th>
                      <th className="px-6 py-4">Voted For</th>
                      <th className="px-6 py-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-sm">
                    {mockVotes.map((vote, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-emerald-600 flex items-center gap-2">
                          <Hash size={14} className="text-slate-300" />
                          {vote.id}
                        </td>
                        <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                          <User size={14} className="text-slate-300" />
                          {vote.voterHash}
                        </td>
                        <td className="px-6 py-4 font-sans font-semibold text-slate-700">
                          {vote.candidate}
                        </td>
                        <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                          <Clock size={14} className="text-slate-300" />
                          {vote.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  )
}

export default PollDetails
