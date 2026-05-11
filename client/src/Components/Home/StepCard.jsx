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

export default StepCard;