import React from 'react';
import { 
  Database,
  Terminal,
  Server,
  Network,
  Activity,
  Box,
  Cpu
} from 'lucide-react';

// View C: "System & Nodes" (System Administrator View)
const SystemNodesView = () => {
  const transactions = [
    { hash: '0x8f2a...9c21', block: '14,293,011', time: '2024-03-12 14:22:11', status: 'confirmed' },
    { hash: '0x1b4c...7d4f', block: '14,293,010', time: '2024-03-12 14:22:04', status: 'confirmed' },
    { hash: '0x9d3e...2a1b', block: '-', time: '2024-03-12 14:23:45', status: 'pending' },
    { hash: '0xc5a1...8f3c', block: '14,293,008', time: '2024-03-12 14:21:10', status: 'failed' },
  ];

  const auditLogs = [
    { event: 'SMART_CONTRACT_DEPLOY', actor: 'SysAdmin', metadata: '{"version": "v1.2", "network": "mainnet"}', time: '10:02 AM' },
    { event: 'NODE_QUORUM_LOST', actor: 'System', metadata: '{"offline_nodes": ["validator-04"]}', time: '11:45 AM' },
    { event: 'POLL_STATE_CHANGE', actor: 'ElectionComm', metadata: '{"poll_id": "POLL-001", "state": "ACTIVE"}', time: '01:22 PM' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Network className="text-blue-500" /> Infrastructure Ledger
          </h2>
          <p className="text-sm text-slate-500 mt-1">Real-time on-chain activity and node health monitoring.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
          <div className="bg-slate-900 text-green-400 font-mono text-[10px] sm:text-xs px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 border border-slate-700 shadow-inner w-full justify-center md:w-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            WebSocket: CONNECTED
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Transaction Ledger Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="flex items-center gap-2 font-bold text-slate-800">
              <Box size={18} className="text-blue-500" />
              Live Transaction Ledger
            </h3>
          </div>
          <div className="flex-1 overflow-auto bg-slate-50/30">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="sticky top-0 bg-white shadow-sm border-b border-slate-100 z-10">
                <tr className="text-[10px] sm:text-xs uppercase font-bold text-slate-400 tracking-wider">
                  <th className="px-3 sm:px-4 py-3">Tx Hash</th>
                  <th className="px-3 sm:px-4 py-3">Block #</th>
                  <th className="px-3 sm:px-4 py-3">Confirmed At</th>
                  <th className="px-3 sm:px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 text-blue-600 font-medium hover:underline cursor-pointer">{tx.hash}</td>
                    <td className="px-4 py-3 text-slate-600">{tx.block}</td>
                    <td className="px-4 py-3 text-slate-500">{tx.time}</td>
                    <td className="px-4 py-3 text-right">
                      {tx.status === 'confirmed' && <span className="text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 border-dashed">CONFIRMED</span>}
                      {tx.status === 'pending' && <span className="text-amber-500 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100 border-dashed flex items-center justify-end gap-1"><Activity size={12} className="animate-spin" /> PENDING</span>}
                      {tx.status === 'failed' && <span className="text-rose-500 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100 border-dashed">FAILED</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Audit Log (Terminal Vibe) */}
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 shadow-lg overflow-hidden flex flex-col h-[500px] text-slate-300 font-mono text-xs relative">
          <div className="px-4 py-3 border-b border-slate-800 bg-[#1e293b] flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-200 font-sans text-sm font-semibold">
              <Terminal size={16} className="text-indigo-400" />
              Runtime Audit Logs
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
            </div>
          </div>
          
          <div className="p-4 overflow-auto flex-1 space-y-3">
            {auditLogs.map((log, i) => (
               <div key={i} className="mb-2 hover:bg-slate-800/50 p-2 rounded transition border border-transparent hover:border-slate-800">
                 <div className="flex gap-3 mb-1">
                   <span className="text-slate-500 shrink-0">[{log.time}]</span>
                   <span className={`font-bold ${log.event.includes('LOST') || log.event.includes('FAIL') ? 'text-rose-400' : 'text-emerald-400'}`}>
                     {log.event}
                   </span>
                 </div>
                 <div className="flex gap-2">
                   <div className="pl-[4.5rem] flex items-start gap-2 text-indigo-300">
                     <span className="text-slate-500 shrink-0">actor:</span> {log.actor}
                   </div>
                 </div>
                 <div className="pl-[4.5rem] mt-1 break-all text-slate-400 bg-slate-900 p-2 rounded-md border border-slate-800 shadow-inner">
                    {log.metadata}
                 </div>
               </div>
            ))}
            <div className="flex items-center gap-2 text-slate-500 animate-pulse mt-4">
              <div className="w-2 h-4 bg-indigo-500"></div> Waiting for incoming logs...
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SystemNodesView;
