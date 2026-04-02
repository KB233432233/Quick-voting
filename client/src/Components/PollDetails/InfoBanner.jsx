import { Calendar, Info } from "lucide-react"

export default function InfoBanner({ startDate, endDate, votingType }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 shadow-sm mb-12">

            <div className="flex-1 pb-4 md:pb-0 md:pr-6">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" /> Start Date
                </div>
                <div className="text-lg font-semibold text-slate-800">{startDate}</div>
            </div>

            <div className="flex-1 py-4 md:py-0 md:px-6">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" /> End Date
                </div>
                <div className="text-lg font-semibold text-slate-800">{endDate}</div>
            </div>

            <div className="flex-1 pt-4 md:pt-0 md:pl-6">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-sm text-white flex items-center justify-center text-[10px] font-bold">V</div> Voting Type
                </div>
                <div className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    Ranked Choice (Top {votingType}) <Info className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
            </div>

        </div>
    )
}
