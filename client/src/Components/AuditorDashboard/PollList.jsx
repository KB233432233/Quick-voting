import { Vote,ChevronLeft } from "lucide-react"

function PollList({mockPolls, setSelectedPoll}) {
  return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Vote className="text-emerald-600" />
                    Polls Available for Audit
                  </h2>
                </div>
                <div className="p-0">
                  <ul className="divide-y divide-slate-100">
                    {mockPolls.map(poll => (
                      <li 
                        key={poll.id} 
                        onClick={() => setSelectedPoll(poll)}
                        className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                      >
                        <div>
                          <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">{poll.title}</h3>
                          <p className="text-xs text-slate-500 mt-1">Poll ID: #{poll.id} • Status: <span className={`${poll.status === 'Active' ? 'text-blue-500' : 'text-slate-500'}`}>{poll.status}</span></p>
                        </div>
                        <div className="flex items-center gap-4 text-sm mt-2 sm:mt-0">
                          <div className="text-slate-600 font-medium">
                            <span className="text-slate-400 font-normal mr-1">Total Votes:</span>
                            {poll.totalVotes}
                          </div>
                          <ChevronLeft size={16} className="text-slate-300 transform rotate-180 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
  )
}

export default PollList
