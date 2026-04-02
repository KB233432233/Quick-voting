import React, { useState } from 'react';
import {
  LayoutDashboard,
  Vote,
  Server,
  ShieldCheck,
  Plus,
  Menu,
  X
} from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';

const AdminLayout = ({ children, userRole = "Election Authority" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/admin-v2/overview', roles: ['All'] },
    { name: 'Elections', icon: Vote, path: '/admin-v2/elections', roles: ['Election Commission', 'Election Authority', 'All'] },
    { name: 'System & Nodes', icon: Server, path: '/admin-v2/system', roles: ['System Administrator', 'All'] },
    { name: 'Audit Center', icon: ShieldCheck, path: '/admin-v2/audit', roles: ['Auditor', 'All'] },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">

      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} 
        transition-all duration-300 ease-in-out bg-slate-900 border-r border-slate-800 flex flex-col relative group`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/50">
          {sidebarOpen ? (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              QuickVote Admin
            </span>
          ) : (
            <span className="text-xl font-bold text-blue-400 mx-auto">QV</span>
          )}
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 bg-slate-800 text-slate-300 rounded-full p-1 border border-slate-700 hover:text-white hover:bg-slate-700 transition transform z-10 hidden sm:block"
        >
          {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
        </button>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            if (!item.roles.includes('All') && !item.roles.includes(userRole)) return null;

            const isActive = location.pathname.includes(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }
                `}
              >
                <item.icon size={20} className={isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-300'} />
                {sidebarOpen && <span className="font-medium text-sm">{item.name}</span>}

                {isActive && sidebarOpen && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-500 rounded-r-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50 mt-auto">
          {sidebarOpen ? (
            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-700">
                {userRole.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">Administrator</p>
                <p className="text-[10px] text-slate-400 truncate">{userRole}</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-slate-700" title={userRole}>
              {userRole.charAt(0)}
            </div>
          )}
        </div>
      </aside>


      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        <header className="h-16 bg-white/70 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-20 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-800 truncate max-w-[120px] sm:max-w-none">
              {navItems.find(i => location.pathname.includes(i.path))?.name || 'Dashboard'}
            </h1>


            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200/60">
              <div className="w-2 relative h-2">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs font-medium text-green-700">All Systems Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {(userRole === 'Election Authority' || userRole === 'Election Commission') && (
              <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                <Plus size={16} />
                <Link to={'/createPoll'}>New Election</Link>
              </button>
            )}

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            <Link to={'/profile'} className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-lg transition">
              <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="User" className="w-7 h-7 rounded-full" />
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children || <Outlet />}
          </div>
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
