import { Zap, Clock, CheckCircle2, Rocket, Box, Timer, Calendar, BarChart3, Vote } from 'lucide-react';
import Navbar from '../Components/Navbar';
import PollCard from '../Components/PollList/PollCard';
import SectionHeader from '../Components/PollList/SectionHeader';

function PollList() {
  return (
    <div className="min-h-screen bg-[#F4F6FB] font-sans pb-24 text-slate-800 selection:bg-[#1D58E9]/20 selection:text-[#1D58E9]">
      <Navbar />

      <main className="max-w-[1000px] mx-auto px-6 pt-12">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-[26px] tracking-tight font-extrabold text-[#0B1527] mb-3">Voting Rounds</h1>
          <p className="text-[14px] text-[#64748B] leading-relaxed pr-8">
            Participate in community decisions. Rank your preferences on active proposals or view past results.
          </p>
        </div>

        <div className="space-y-12">
          {/* Active Polls */}
          <section>
            <SectionHeader
              icon={Zap}
              title="Active Polls"
              badge="2 Active"
              iconColor="text-[#1D58E9]"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <PollCard
                status="active"
                title="Community Fund Allocation Q3"
                description="Rank your top preferences for the Q3 community fund allocation. Options include new parks, library upgrades..."
                timeRemaining="12h 45m remaining"
                imageClass="bg-[#0f3d32] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.3),transparent)]"
              />
              <PollCard
                status="active"
                title="Emergency Security Patch"
                description="Prioritize the deployment of security patches. Rank v4.2.1 and v4.3.0 based on urgency and risk..."
                timeRemaining="04h 12m remaining"
                imageClass="bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,rgba(71,85,105,0.4),transparent)]"
              />
            </div>
          </section>

          {/* Upcoming Polls */}
          <section>
            <SectionHeader
              icon={Clock}
              title="Upcoming Polls"
              iconColor="text-[#64748B]"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <PollCard
                status="upcoming"
                icon={Rocket}
                title="Protocol Upgrade v2.0"
                description="Prepare to rank the features for Protocol Upgrade v2.0. Decide between staking rewards, gas..."
                timeRemaining="Starts in 2 days (Oct 24)"
              />
              <PollCard
                status="upcoming"
                icon={Box}
                title="Token Burn Event"
                description="Rank your preferred token burn strategy: 1% immediate, 5% over time, or dynamic burn based..."
                timeRemaining="Starts Nov 01"
              />
            </div>
          </section>

          {/* Closed Polls */}
          <section>
            <SectionHeader
              icon={CheckCircle2}
              title="Closed Polls"
              iconColor="text-[#64748B]"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <PollCard
                status="closed"
                icon={BarChart3}
                title="Governance Proposal #42"
                description="See how the community ranked the quorum requirement options for future governance votes."
                timeRemaining="Ended Oct 12"
              />
              <PollCard
                status="closed"
                icon={Vote}
                title="UI Theme Selection"
                description="View the final rankings of the community-submitted color palettes for the new dark mode interface."
                timeRemaining="Ended Sep 28"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PollList;
