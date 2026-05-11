import { Building2, Check, X, List } from 'lucide-react';

function PendingRequests({handleApprove, handleReject, requests}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="text-amber-500" />
            Pending Organization Requests
          </h2>
        </div>
        <div className="p-0">
          {requests.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No pending requests.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {requests.map(req => (
                <li key={req.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{req.name}</h3>
                    <p className="text-xs text-slate-500">Legal: {req.legalName} • Tax ID: {req.taxId}</p>
                    <p className="text-xs text-slate-500">Email: {req.email} • Address: {req.address}</p>
                    <p className="text-xs text-slate-400 font-mono mt-1">Wallet: {req.walletAddress}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleApprove(req)}
                      className="flex items-center justify-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-lg font-medium transition-colors border border-emerald-200"
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(req.id)}
                      className="flex items-center justify-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-lg font-medium transition-colors border border-rose-200"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

  )
}

export default PendingRequests
