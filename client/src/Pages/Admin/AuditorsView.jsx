import React, { useState } from 'react';
import { ShieldCheck, Plus } from 'lucide-react';
import { useWriteOnChain } from '../../hooks/WriteOnChain';

const AuditorsView = () => {
  const [walletAddress, setWalletAddress] = useState('');
  // const [auditorName, setAuditorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { addAuditor } = useWriteOnChain();

  const handleRegisterAuditor = async (e) => {
    e.preventDefault();
    if (!walletAddress) {
      alert("Please enter a valid wallet address.");
      return;
    }
    
    try {
      setIsLoading(true);
      await addAuditor(walletAddress);
      alert("Auditor added successfully!");
      setWalletAddress('');
      // setAuditorName('');
    } catch (e) {
      console.error("Failed to add auditor on chain:", e);
      alert("Failed to add auditor. Check the console for more info.");
    } finally {
      setIsLoading(false);
    }
  };
  const auditors = []

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <ShieldCheck className="text-emerald-500" />
          Add Auditor
        </h2>
        <form className="space-y-4 max-w-lg" onSubmit={handleRegisterAuditor}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Wallet Address / Public Key</label>
            <input 
              type="text" 
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
              placeholder="0x..." 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto ${isLoading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            <Plus size={18} />
            {isLoading ? 'Registering...' : 'Register Auditor'}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" />
            Auditors
          </h2>
        </div>
        <div className="p-0">
          {auditors.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No admins added yet.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {auditors.map((admin) => (
                <li
                  key={admin.id}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">{admin.name}</h3>
                    <p className="text-xs text-slate-500">{admin.address}</p>
                  </div>
                  <button
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border ${isRemoving ? 'bg-rose-50 text-rose-300 border-rose-100 cursor-not-allowed' : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200'}`}
                  >
                    <Trash2 size={16} />
                    Remove
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

export default AuditorsView;