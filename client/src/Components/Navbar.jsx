import { Link } from "react-router";
import { useWeb3 } from "../context/Web3Context";

const Navbar = () => {
    const { account } = useWeb3();

    const formatAddress = (addr) => {
        if (!addr) return "Connect Wallet";
        return `${addr.substring(0, 5)}...${addr.substring(addr.length - 4)}`;
    };

    return (
        <header className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-8">
                <Link to="/pollList" className="flex items-center gap-3 text-slate-900 font-bold text-lg">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                        <img src="/logo.jpg" />
                    </div>
                    Quick
                </Link>
            </div>

            <div className="flex items-center gap-6">
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                    <Link to="/pollList" className="hover:text-slate-900">Polls</Link>
                    <Link to={account ? "/profile" : "/signup"} className="flex items-center gap-2 cursor-pointer bg-[#1D58E9] hover:bg-[#1546C6] text-white px-3.5 py-2.5 rounded-xl text-[13px] font-semibold shadow-sm transition-colors">
                        <span>{formatAddress(account)}</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;