
function PollTitle({ title, desc }) {
    return (
        <>
            <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-4 lowercase" style={{ fontVariant: 'small-caps' }}>
                {title}
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl leading-relaxed mb-8">
                {desc}
            </p>
        </>
    )
}

export default PollTitle