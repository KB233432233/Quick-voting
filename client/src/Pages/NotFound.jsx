import React from 'react';
import { Link } from 'react-router';
import { ShieldAlert, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1c] flex flex-col items-center justify-center p-4 font-sans text-slate-200 selection:bg-indigo-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] max-w-2xl h-[40%] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[30%] rounded-full bg-red-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-slate-900/80 border border-slate-700/50 flex items-center justify-center shadow-2xl backdrop-blur-xl relative group">
            <div className="absolute inset-0 bg-red-500/10 rounded-3xl animate-pulse" />
            <ShieldAlert className="w-10 h-10 text-red-400/90 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
        
        <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 mb-4 drop-shadow-lg">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Page breaks the space-time continuum</h2>
        
        <p className="text-slate-400 text-[15px] mb-10 leading-relaxed max-w-sm mx-auto">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-bold text-white transition-all duration-300 bg-indigo-600 border border-transparent rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-[#0a0f1c] shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          <Link 
            to="/pollList" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-bold text-slate-300 transition-all duration-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 focus:ring-offset-[#0a0f1c] hover:-translate-y-0.5 backdrop-blur-sm"
          >
            Explore Polls
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;