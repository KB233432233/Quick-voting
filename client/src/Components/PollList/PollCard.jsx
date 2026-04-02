import { Timer } from 'lucide-react';
import { Link } from 'react-router';

const PollCard = ({
  status,
  title,
  description,
  timeRemaining,
  imageClass,
  icon: Icon,
}) => {

  const textColor = {
    active: "text-[#1D58E9]",
    upcoming: "text-[#1D58E9]",
    closed: "text-[#697080]"
  }

  return (
    <div className="bg-white rounded-[20px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className={`h-[150px] relative flex items-start justify-between p-4 ${imageClass} bg-cover bg-center overflow-hidden`}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

        <span className="relative z-10 bg-[#10B981] text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-90 animate-pulse" /> {status}
        </span>
        <span className="relative z-10 bg-[#0B1527]/80 backdrop-blur-md text-white/90 text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/10">
          Ranked Choice
        </span>

        {Icon ? <Icon className="w-8 h-8 text-[#94A3B8] mt-4" /> : null}

        <div className="absolute bottom-4 left-4 right-4 z-10">
          <h3 className="text-[17px] font-bold text-white drop-shadow-md">{title}</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-2 mb-5">
          {description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl flex items-center gap-2 p-3">
            <Timer className={`w-4 h-4 ${textColor[status]}`} />
            <span className={`text-[12px] font-bold ${textColor[status]} tracking-tight`}>{timeRemaining}</span>
          </div>
          {status === 'active' ?
            <Link to={`/poll/1`} className="w-full bg-[#1D58E9] hover:bg-[#1546C6] text-white font-semibold text-[14px] py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center">
              Rank & Vote
            </Link> : status === 'upcoming' ?
              <button disabled className="w-full bg-[#F1F5F9] text-[#94A3B8] font-bold text-[14px] py-3 rounded-xl cursor-not-allowed border border-[#E2E8F0]/50">
                Not Started
              </button> : status === 'closed' ?
                <Link to="/poll/1/results" className="w-full inline-block text-center bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0B1527] font-bold text-[14px] py-3 rounded-xl transition-colors shadow-sm">
                  View Results
                </Link> : null
          }
        </div>
      </div>
    </div>
  );

}

export default PollCard;