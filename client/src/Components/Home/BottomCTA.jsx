import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

function BottomCTA() {
  return (
        <div className="mt-16 py-16 px-6 relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-indigo-950/20 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to host your first election?</h2>
            <p className="text-indigo-200/80 mb-8 text-lg">Join thousands of communities trusting Quick-voting with their most important decisions.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-indigo-950 transition-all duration-200 bg-white rounded-xl hover:bg-indigo-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-[#0a0f1c] shadow-lg shadow-white/20">
                Get Started Now
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/orgRegister" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-indigo-600/50 hover:bg-indigo-600 rounded-xl hover:scale-105 focus:outline-none border border-indigo-400/30">
                Apply as an Organization
              </Link>
            </div>
          </div>
        </div>
  )
}

export default BottomCTA
