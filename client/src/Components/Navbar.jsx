import { Link } from "react-router";
// import { useWeb3 } from "../context/Web3Context";
import { useAccount } from 'wagmi';
import { useRole } from '../context/RoleContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    // const { account } = useWeb3();
    const { address: account } = useAccount();
    const { userRole } = useRole();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const formatAddress = (addr) => {
        if (!addr) return "Connect Wallet";
        return 'Profile';
    };

    return (
        <header className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-8">
                <Link to="/pollList" className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                        <img className="bg-white" src="/logo.png" />
                    </div>
                    Quick
                </Link>
            </div>

            <div className="flex items-center gap-6">
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                    <Link to="/pollList" className="hover:text-slate-900">Polls</Link>
                    
                    {userRole === 'Owner' && (
                        <Link to="/admin-v2" className="hover:text-slate-900 border-l border-slate-300 pl-6">Admin Panel</Link>
                    )}
                    
                    {(userRole === 'Organization') && (
                        <Link to="/orgDashboard" className="hover:text-slate-900">Org Dashboard</Link>
                    )}
                    
                    {(userRole === 'Auditor') && (
                        <Link to="/auditorDashboard" className="hover:text-slate-900">Auditor Dashboard</Link>
                    )}

                    {(!userRole || (userRole !== 'Organization' && userRole !== 'Owner')) && (
                        <Link to="/orgRegister" className="hover:text-slate-900">Apply as Org</Link>
                    )}

                    <Link to={account ? "/profile" : "/signup"} className="flex items-center gap-2 cursor-pointer bg-[#1D58E9] hover:bg-[#1546C6] text-white px-3.5 py-2.5 rounded-xl text-[13px] font-semibold shadow-sm transition-colors">
                        <span>{formatAddress(account)}</span>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center transition-colors shadow-sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-lg p-4 flex flex-col gap-4 md:hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                    <Link to="/pollList" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 font-medium py-2">Polls</Link>
                    
                    {userRole === 'Owner' && (
                        <Link to="/admin-v2" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 font-medium py-2">Admin Panel</Link>
                    )}
                    
                    {(userRole === 'Organization') && (
                        <Link to="/orgDashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 font-medium py-2">Org Dashboard</Link>
                    )}
                    
                    {(userRole === 'Auditor') && (
                        <Link to="/auditorDashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 font-medium py-2">Auditor Dashboard</Link>
                    )}

                    {(!userRole || (userRole !== 'Organization' && userRole !== 'Owner')) && (
                        <Link to="/orgRegister" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 font-medium py-2">Apply as Org</Link>
                    )}

                    <div className="pt-2 border-t border-slate-100 mt-2">
                        <Link to={account ? "/profile" : "/signup"} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 cursor-pointer bg-[#1D58E9] hover:bg-[#1546C6] text-white px-4 py-3 rounded-xl text-[14px] font-semibold shadow-sm transition-colors w-full">
                            <span>{formatAddress(account)}</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;