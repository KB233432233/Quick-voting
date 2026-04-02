const StatCard = ({ icon: Icon, label, value, trend }) => (
    <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-full bg-[#EBF1FF] flex items-center justify-center text-[#1D58E9]">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-[13px] font-semibold text-[#64748B] mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-[22px] font-bold text-[#0B1527] leading-none">{value}</h3>
                {trend && (
                    <span className="text-[12px] font-medium text-[#10B981] flex items-center bg-[#10B981]/10 px-1.5 py-0.5 rounded-md">
                        {trend}
                    </span>
                )}
            </div>
        </div>
    </div>
);

export default StatCard;