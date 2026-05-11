import React from 'react';
import { ShieldCheck, Plus } from 'lucide-react';

const AuditorsView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <ShieldCheck className="text-emerald-500" />
          Add Auditor
        </h2>
        <form className="space-y-4 max-w-lg" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Auditor Name</label>
            <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Enter auditor name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Wallet Address / Public Key</label>
            <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="0x..." />
          </div>
          <button type="submit" className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto">
            <Plus size={18} />
            Register Auditor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuditorsView;