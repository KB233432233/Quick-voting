import { ShieldCheck } from "lucide-react"

function Header() {
  return (
           <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-6 sm:p-8 border border-emerald-800 shadow-xl text-white relative overflow-hidden">
             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 hidden sm:block">
               <ShieldCheck size={200} />
             </div>
             <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div>
                 <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Auditor Portal</h1>
                 <p className="text-emerald-100/80 max-w-xl text-xs sm:text-sm leading-relaxed">
                   Review election integrity, verify vote timestamps, and ensure transparent ballot tallying without compromising voter privacy.
                 </p>
               </div>
               <div className="bg-emerald-800/50 backdrop-blur-sm border border-emerald-700/50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold">
                    AU
                  </div>
                  <div>
                    <p className="text-sm font-semibold capitalize">System Auditor</p>
                    <p className="text-[10px] text-emerald-300 font-mono">0x1A4...9B2</p>
                  </div>
               </div>
             </div>
           </div>
  )
}

export default Header
