import { Link } from "react-router"
import { ShieldCheck, Zap, UserX, Settings, ChevronRight, Vote, BarChart3, Users } from 'lucide-react'

function HeroSection() {
  return (
        <div className="text-center space-y-8 py-20 pb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Next-Gen Voting Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 pb-6 drop-shadow-sm">
            Secure, Transparent <br className="hidden md:block" />
            & Lightning-Fast Voting
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
            Empower your community with blockchain-verified elections. Create polls in seconds, vote with absolute anonymity, and get verifiable results instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/signup" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-[#0a0f1c] shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] hover:-translate-y-0.5">
              Get started
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/pollList" className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-300 transition-all duration-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 focus:ring-offset-[#0a0f1c] hover:-translate-y-0.5 backdrop-blur-sm">
              Explore Polls
            </Link>
          </div>
        </div>
  )
}

export default HeroSection
