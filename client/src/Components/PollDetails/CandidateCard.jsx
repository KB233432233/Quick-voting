
function CandidateCard({ candidate, isSelected, toggleSelection, rankIndex }) {
    return (
        <div
            // key={candidate.id}
            onClick={() => toggleSelection(candidate.id)}
            className={`
                  bg-white rounded-2xl p-6 cursor-pointer transition-all duration-200 relative flex flex-col h-full
                  ${isSelected ? 'border-2 border-blue-600 shadow-md ring-4 ring-blue-50' : 'border border-slate-200 hover:border-blue-300 hover:shadow-md'}
                `}
        >
            {/* Header: Icon & Rank */}
            <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${candidate.iconBg} ${!candidate.iconBg.includes('bg-') && 'bg-slate-100'} shadow-sm`}>
                    <candidate.icon className={`w-5 h-5 ${candidate.iconColor} ${candidate.iconBg === 'bg-cyan-600' && 'text-white'}`} />
                </div>

                {isSelected ? (
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        {rankIndex}
                    </div>
                ) : (
                    <div className="px-4 py-1.5 rounded-full border border-slate-200 text-slate-700 font-medium text-xs hover:border-blue-300 transition-colors bg-white">
                        Rank
                    </div>
                )}
            </div>

            {/* Body */}
            <h3 className="font-bold text-lg text-slate-900 mb-2 tracking-tight">{candidate.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                {candidate.description}
            </p>
        </div>
    )
}

export default CandidateCard