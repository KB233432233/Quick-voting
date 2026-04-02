import { ArrowRight } from "lucide-react"


function FloatingBar({ selected }) {
    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 animate-in slide-in-from-bottom-8 duration-500">
            <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 max-w-xl w-full">

                <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Your Selection</p>
                    <p className="text-sm font-bold text-slate-800">
                        <span className={selected.length > 0 ? 'text-blue-600' : ''}>{selected.length}</span> of 3 candidates ranked
                    </p>
                </div>

                <button
                    className={`
              w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white transition-all
              ${selected.length > 0
                            ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                            : 'bg-slate-300 cursor-not-allowed'}
            `}
                    disabled={selected.length === 0}
                    onClick={() => alert(`Voting with ranking: ${selected.join(', ')}`)}
                >
                    Vote Now <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default FloatingBar