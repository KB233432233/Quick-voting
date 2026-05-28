import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getRecentEventsFromChain } from '../../hooks/ReadFromChain';

const formatTime = (value) =>
    value ? new Date(value * 1000).toLocaleString() : 'N/A';

const shortenAddress = (address) => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const EventActivitySection = () => {
    const [events, setEvents] = useState({
        pollCreated: [],
        pollStarted: [],
        pollFinalized: [],
    });
    const [loadingEvents, setLoadingEvents] = useState(true);

    useEffect(() => {
        let mounted = true;

        const loadEvents = async () => {
            const latestEvents = await getRecentEventsFromChain();
            if (!mounted) return;
            setEvents(latestEvents);
            setLoadingEvents(false);
        };

        loadEvents();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <section className="mt-16">
            <div className="mb-10 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">On-chain activity</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Latest poll events</h2>
                {/* <p className="mt-3 text-slate-400 max-w-2xl mx-auto">Top five recent PollCreated, PollStarted and PollFinalized events from the contract.</p> */}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/20">
                    <h3 className="text-xl font-semibold text-white">Poll Created</h3>
                    <p className="mt-2 text-sm text-slate-400">Latest 5 polls created.</p>
                    <div className="mt-6 space-y-4">
                        {loadingEvents ? (
                            <p className="text-slate-400">Loading events...</p>
                        ) : events.pollCreated.length > 0 ? (
                            events.pollCreated.map((item) => (
                                <Link
                                    key={`created-${item.pollId}-${item.startTime}`}
                                    to={item.link}
                                    className="block rounded-3xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-indigo-500"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">Poll #{item.pollId}</p>
                                    <p className="mt-2 font-semibold text-white truncate">{item.title || `Poll #${item.pollId}`}</p>
                                    {/* <p className="mt-3 text-sm text-slate-400">Creator: {shortenAddress(item.creator)}</p> */}
                                    <p className="mt-3 text-sm text-slate-400">Starts: {formatTime(item.startTime)}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-slate-500">No poll created events found.</p>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/20">
                    <h3 className="text-xl font-semibold text-white">Poll Started</h3>
                    <p className="mt-2 text-sm text-slate-400">Latest 5 poll start events.</p>
                    <div className="mt-6 space-y-4">
                        {loadingEvents ? (
                            <p className="text-slate-400">Loading events...</p>
                        ) : events.pollStarted.length > 0 ? (
                            events.pollStarted.map((item) => (
                                <Link
                                    key={`started-${item.pollId}-${item.startTime}`}
                                    to={item.link}
                                    className="block rounded-3xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-indigo-500"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">Poll #{item.pollId}</p>
                                    <p className="mt-2 font-semibold text-white truncate">{item.title || `Poll #${item.pollId}`}</p>
                                    <p className="mt-3 text-sm text-slate-400">Started at {formatTime(item.startTime)}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-slate-500">No poll started events found.</p>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/20">
                    <h3 className="text-xl font-semibold text-white">Poll Finalized</h3>
                    <p className="mt-2 text-sm text-slate-400">Latest 5 finalized poll winners.</p>
                    <div className="mt-6 space-y-4">
                        {loadingEvents ? (
                            <p className="text-slate-400">Loading events...</p>
                        ) : events.pollFinalized.length > 0 ? (
                            events.pollFinalized.map((item) => (
                                <Link
                                    key={`finalized-${item.pollId}-${item.winnerIndex}`}
                                    to={item.link}
                                    className="block rounded-3xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-indigo-500"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">Poll #{item.pollId}</p>
                                    <p className="mt-2 font-semibold text-white truncate">{item.title || `Poll #${item.pollId}`}</p>
                                    <p className="mt-3 text-sm text-slate-400">Winner: {item.winnerName || `Candidate #${item.winnerIndex}`}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-slate-500">No poll finalized events found.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventActivitySection;
