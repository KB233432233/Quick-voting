import { List } from "lucide-react"

function RegisteredOrgs({organizations}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <List className="text-blue-500" />
            Registered Organizations
          </h2>
        </div>
        <div className="p-0">
          {organizations.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No organizations registered yet.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {organizations.map(org => (
                <li key={org.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <h3 className="font-semibold text-slate-800">{org.name}</h3>
                    <p className="text-xs text-slate-500">Legal: {org.legalName} • Tax ID: {org.taxId}</p>
                    <p className="text-xs text-slate-400 font-mono mt-1">Wallet: {org.walletAddress}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
  )
}

export default RegisteredOrgs
