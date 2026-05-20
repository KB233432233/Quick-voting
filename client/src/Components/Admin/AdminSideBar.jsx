import {
  LayoutDashboard,
  Vote,
  ShieldCheck,
  Building2,
  Plus,
  Menu,
  X
} from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';

function AdminSideBar({sidebarOpen, setSidebarOpen ,navItems, userRole}) {
  return (
    <aside
      className={`
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 sm:w-20 sm:translate-x-0'} 
        fixed sm:relative z-30 h-full transition-all duration-300 ease-in-out bg-slate-900 border-r border-slate-800 flex flex-col group
      `}
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
      </aside>
  )
}

export default AdminSideBar
