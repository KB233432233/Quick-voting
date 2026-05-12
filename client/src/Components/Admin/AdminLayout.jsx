import {useState} from 'react';
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
import AdminSideBar from './AdminSideBar';

const AdminLayout = ({ children, userRole = "All" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 640);
  const location = useLocation();

  const navItems = [
    { name: 'Organizations', icon: Building2, path: '/admin-v2/organizations', roles: ['All'] },
    { name: 'Auditors', icon: ShieldCheck, path: '/admin-v2/auditors', roles: ['All'] },
    { name: 'Manage Polls', icon: Vote, path: '/admin-v2/polls', roles: ['All'] }
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">

      <AdminSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} navItems={navItems} userRole={userRole} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 sm:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        <header className="h-16 bg-white/70 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="sm:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-800 truncate max-w-[150px] sm:max-w-none">
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
