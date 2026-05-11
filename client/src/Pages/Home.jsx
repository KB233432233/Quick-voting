import { Link } from 'react-router';
import { ShieldCheck, Zap, UserX, Settings, ChevronRight, Vote, BarChart3, Users } from 'lucide-react';
import BackgroundOrbs from '../Components/Home/Backgroundorbs';
import HeroSection from '../Components/Home/HeroSection';
import FeaturesSection from '../Components/Home/FeaturesSection';
import HowItWorks from '../Components/Home/HowItWorks';
import BottomCTA from '../Components/Home/BottomCTA';

function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans selection:bg-indigo-500/30">
      <BackgroundOrbs />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <HeroSection />

        <FeaturesSection />

        <HowItWorks />

        <BottomCTA />

      </div>
    </div>
  );
}

export default Home;
