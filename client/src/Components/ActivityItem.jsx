


const ActivityItem = ({ icon: Icon, title, date, status }) => (
    <div className="flex items-start gap-4 p-4 hover:bg-[#F8FAFC] rounded-2xl transition-colors">
        <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-slate-100 flex items-center justify-center text-[#64748B] flex-shrink-0 mt-0.5">
            <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="text-[15px] font-bold text-[#0B1527] truncate">{title}</h4>
            <p className="text-[13px] text-[#64748B] mt-1">{date}</p>
        </div>
        {status && (
            <div className="flex-shrink-0">
                <span className="bg-[#EBF1FF] text-[#1D58E9] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#D1E0FF]/50">
                    {status}
                </span>
            </div>
        )}
    </div>
);

export default ActivityItem;