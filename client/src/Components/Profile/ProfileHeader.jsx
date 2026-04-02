

function ProfileHeader({ isVoter }) {
    return (
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
                <h1 className="text-[26px] tracking-tight font-extrabold text-[#0B1527] mb-3">{isVoter ? "Voter Profile" : "Admin Profile"}</h1>
                <p className="text-[14px] text-[#64748B] leading-relaxed pr-8">
                    {isVoter ? "Manage your identity, view your voting power, and track your governance participation history." : ""}
                </p>
            </div>
        </div>
    )
}

export default ProfileHeader