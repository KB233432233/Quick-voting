import StepCard from "./StepCard"
import { ShieldCheck, Zap, UserX, Settings, ChevronRight, Vote, BarChart3, Users } from 'lucide-react';



function HowItWorks() {
  return (
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

  )
}

export default HowItWorks
