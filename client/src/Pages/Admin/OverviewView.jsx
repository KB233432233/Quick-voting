import React from 'react';
import {
  Vote,
  Users,
  Activity,
  Clock,
  ArrowUpRight,
  Sparkles,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Server
} from 'lucide-react';

// View A: The "Overview" Dashboard
const OverviewView = () => {
  // Mock data for the dashboard
  const metrics = [
    { title: 'Active Polls', value: '14', change: '+2', trend: 'up', icon: Vote, color: 'blue' },
    { title: 'Total Votes Cast', value: '45,231', change: '+12.5%', trend: 'up', icon: Users, color: 'indigo' },
    { title: 'Pending Transactions', value: '3', change: '-5', trend: 'down', icon: Activity, color: 'amber' },
  ];

  const recentActivity = [
    { id: 1, type: 'vote_cast', label: 'Vote Cast', desc: 'Secure hash recorded for Poll #2024-X1', time: '2 mins ago', status: 'success' },
    { id: 2, type: 'poll_created', label: 'Poll Created', desc: 'Student Council Election 2024 drafted', time: '1 hour ago', status: 'info' },
    { id: 3, type: 'node_sync', label: 'Node Sync', desc: 'Validator node eu-west-1 synced', time: '3 hours ago', status: 'success' },
    { id: 4, type: 'tally_failed', label: 'Tally Warning', desc: 'Temporary lag in Merkle proof generation', time: '5 hours ago', status: 'warning' },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'indigo': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'amber': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'warning': return <AlertCircle size={16} className="text-amber-500" />;
      case 'info': return <Activity size={16} className="text-blue-500" />;
      default: return <Clock size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-white/5 transform rotate-12 hidden sm:block">
          <Sparkles size={240} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">System Health & Overview</h2>
            <p className="text-indigo-200 text-sm max-w-xl">
              All cryptographic voting nodes are successfully synced. The network has registered over 45k secure votes with 0 integrity violations logged in the last 24 hours.
            </p>
          </div>
          <button className="flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/10 transition-all font-medium text-sm w-full md:w-fit">
            <RefreshCcw size={16} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl border ${getColorClasses(metric.color)}`}>
                <metric.icon size={22} />
              </div>
              <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${metric.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {metric.trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowUpRight size={14} className="mr-1 transform rotate-90" />}
                {metric.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{metric.title}</h3>
            <div className="text-3xl font-bold text-slate-800 tracking-tight">{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Activity Feed & Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 align-top">
        {/* Left Col - Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50/50 gap-2">
            <h3 className="text-base font-bold text-slate-800">Recent Activity Engine</h3>
            <span className="text-[10px] sm:text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md cursor-pointer hover:bg-indigo-100 transition">View Full Logs</span>
          </div>
          <div className="p-5 flex-1">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:to-transparent">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group flex-col sm:flex-row">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-white shadow-sm absolute left-0 sm:left-auto md:left-1/2 -ml-5 sm:-ml-0 md:-ml-5 z-10 self-start sm:self-auto">
                    <div className={`p-1.5 rounded-full ${activity.status === 'success' ? 'bg-emerald-50' : activity.status === 'warning' ? 'bg-amber-50' : 'bg-indigo-50'}`}>
                      {getStatusIcon(activity.status)}
                    </div>
                  </div>
                  <div className="w-full sm:w-auto bg-white border border-slate-100 rounded-xl p-4 shadow-sm group-hover:shadow-md transition-shadow ml-12 sm:ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] hover:border-indigo-100 mt-2 sm:mt-0">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <span className="text-sm font-bold text-slate-800">{activity.label}</span>
                      <span className="text-xs text-slate-400 font-medium">{activity.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">{activity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col - System Quick Snapshot */}
        <div className="bg-gradient-to-b from-indigo-500 to-indigo-700 rounded-2xl border border-indigo-400 shadow-md p-6 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Server size={180} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">Network Capacity</h3>
            <p className="text-indigo-200 text-xs mb-6">Current load distribution across validator nodes.</p>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-indigo-100">On-Chain Processing</span>
                  <span className="text-white">42%</span>
                </div>
                <div className="w-full bg-indigo-900/40 rounded-full h-1.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-indigo-100">Storage IOPS</span>
                  <span className="text-white">18%</span>
                </div>
                <div className="w-full bg-indigo-900/40 rounded-full h-1.5">
                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-indigo-100">Merkle Prover Usage</span>
                  <span className="text-white">88%</span>
                </div>
                <div className="w-full bg-indigo-900/40 rounded-full h-1.5">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-indigo-400/30 flex items-center justify-between">
            <span className="text-xs text-indigo-200">System Uptime</span>
            <span className="text-sm font-bold">99.998%</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OverviewView;
