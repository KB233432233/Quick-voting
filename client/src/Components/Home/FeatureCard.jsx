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

export default FeatureCard;