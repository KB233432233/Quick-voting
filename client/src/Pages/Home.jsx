import { Link } from 'react-router';
import { ShieldCheck, Zap, UserX, Settings, ChevronRight, Vote, BarChart3, Users } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 py-20 pb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Next-Gen Voting Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 pb-2 drop-shadow-sm">
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

        {/* Features Section */}
        <div className="py-24 border-t border-slate-800/50 relative">
          <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why choose Quick-voting?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Built from the ground up to provide the most reliable and user-friendly voting experience on the web.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-emerald-400" />}
              title="End-to-End Security"
              description="Cryptographically secured votes ensuring your election integrity cannot be compromised."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-amber-400" />}
              title="Real-time Results"
              description="Watch the votes roll in live with zero delay. Instant tallying when the poll closes."
            />
            <FeatureCard
              icon={<UserX className="w-8 h-8 text-purple-400" />}
              title="Absolute Anonymity"
              description="Zero-knowledge proofs guarantee voter identity is completely separated from their vote."
            />
            <FeatureCard
              icon={<Settings className="w-8 h-8 text-blue-400" />}
              title="Total Customization"
              description="Set specific rules, closing times, and allowed voter lists with a few clicks."
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent rounded-3xl" />
          <div className="relative z-10 text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400">Three simple steps to secure, verifiable elections.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-8 relative z-10 max-w-5xl mx-auto">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-[2rem] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent z-0" />

            <StepCard number="1" icon={<Users className="w-6 h-6" />} title="Connect & Setup" desc="Link your wallet and define your election parameters in minutes." />
            <StepCard number="2" icon={<Vote className="w-6 h-6" />} title="Cast Votes" desc="Eligible participants securely cast their verifiable votes." />
            <StepCard number="3" icon={<BarChart3 className="w-6 h-6" />} title="Instantly Tally" desc="View unalterable results instantly as soon as the poll ends." />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 py-16 px-6 relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-indigo-950/20 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to host your first election?</h2>
            <p className="text-indigo-200/80 mb-8 text-lg">Join thousands of communities trusting Quick-voting with their most important decisions.</p>
            <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-indigo-950 transition-all duration-200 bg-white rounded-xl hover:bg-indigo-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-[#0a0f1c] shadow-lg shadow-white/20">
              Get Started Now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group relative p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.2)] backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-x-0 -bottom-px h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/50 transition-all duration-500" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[40px] group-hover:bg-indigo-500/10 transition-colors" />
      <div className="w-14 h-14 rounded-xl bg-slate-900/80 flex items-center justify-center mb-6 ring-1 ring-inset ring-slate-700/50 group-hover:ring-indigo-500/50 transition-all relative z-10 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 relative z-10">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm relative z-10">{description}</p>
    </div>
  );
}

function StepCard({ number, icon, title, desc }) {
  return (
    <div className="relative flex flex-col items-center text-center group z-10">
      <div className="w-16 h-16 rounded-2xl bg-[#0a0f1c] border-2 border-slate-800 flex items-center justify-center text-indigo-400 mb-6 relative group-hover:border-indigo-500 transition-colors duration-300 shadow-xl z-10">
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 border-2 border-[#0a0f1c] flex items-center justify-center text-sm font-bold text-white shadow-lg">
          {number}
        </div>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 text-sm max-w-[250px]">{desc}</p>
    </div>
  );
}

export default Home;
