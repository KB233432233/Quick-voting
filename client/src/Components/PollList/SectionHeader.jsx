

const SectionHeader = ({ icon: Icon, title, badge, iconColor }) => (
    <div className="flex items-baseline gap-4 mb-5">
        <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            <h2 className="text-[17px] font-bold text-[#0B1527]">{title}</h2>
        </div>
        {badge && (
            <span className="bg-[#EBF1FF] text-[#1D58E9] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#D1E0FF]/50">
                {badge}
            </span>
        )}
    </div>
);

export default SectionHeader