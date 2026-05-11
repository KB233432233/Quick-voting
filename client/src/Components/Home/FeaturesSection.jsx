import FeatureCard from "./FeatureCard"
import { ShieldCheck, Zap, UserX, Settings, ChevronRight, Vote, BarChart3, Users } from 'lucide-react';



function FeaturesSection() {
  return (
        <div className="py-24 border-t border-slate-800/50 relative">
          <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why choose Quick-voting?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Built from the ground up to provide the most reliable and user-friendly voting experience on the web.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-emerald-400" />}
              title="End-to-End Security"
              description="Cryptographically secured votes ensuring your election integrity cannot be compromised."
            />
            <FeatureCard
              icon={<Settings className="w-8 h-8 text-blue-400" />}
              title="Total Customization"
              description="Set specific rules, closing times, and allowed voter lists with a few clicks."
            />
          </div>
        </div>
  )
}

export default FeaturesSection
