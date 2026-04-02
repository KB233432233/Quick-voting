import { CheckCircle2 } from "lucide-react";

function ProfileIcon({ name }) {
    return (
        <div className="relative mb-5 mt-4">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-sm border border-slate-100">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1D58E9] to-[#8ACBFF] flex items-center justify-center text-white text-3xl font-bold">
                    {name.slice(0, 2).toUpperCase()}
                </div>
            </div>
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#10B981] rounded-full border-2 border-white flex items-center justify-center shadow-sm text-white">
                <CheckCircle2 className="w-3 h-3" />
            </div>
        </div>
    )
}

export default ProfileIcon