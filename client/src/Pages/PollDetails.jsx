import { useState } from 'react';
import {
  ChevronRight,
  TrendingUp,
  Droplets,
  Heart,
  Shield,
  Layers,
  GraduationCap,
  Leaf,
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import CandidateCard from '../Components/PollDetails/CandidateCard'
import FloatingBar from '../Components/PollDetails/FloatingBar'
import InfoBanner from '../Components/PollDetails/InfoBanner';
import PollTitle from '../Components/PollDetails/PollTitle';

const PollDetails = () => {

  const [selected, setSelected] = useState([]);

  const candidates = [
    {
      id: 1,
      name: 'Project Alpha Infrastructure',
      description: 'Building a robust layer-2 scaling solution to improve transaction throughput and reduce costs for the entire network ecosystem.',
      requested: '5000 OP',
      meta: 'Top Contender',
      metaIcon: TrendingUp,
      metaColor: 'text-blue-600',
      icon: Layers,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-slate-900',
    },
    {
      id: 2,
      name: 'Green Earth Initiative',
      description: 'A decentralized platform for tracking carbon credits and incentivizing reforestation projects across three continents.',
      requested: '2500 OP',
      meta: '32 Contributors',
      metaIcon: null,
      metaColor: 'text-slate-500',
      icon: Leaf,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-slate-800',
    },
    {
      id: 3,
      name: 'Privacy Shield Protocol',
      description: 'Enhancing user privacy through zero-knowledge proofs integration into standard wallet interfaces.',
      requested: '8000 OP',
      meta: 'New Entry',
      metaIcon: null,
      metaColor: 'text-slate-500',
      icon: Shield,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
    },
    {
      id: 4,
      name: 'EduChain Academy',
      description: 'Free educational resources for developers entering the web3 space, including interactive tutorials and certification.',
      requested: '1500 OP',
      meta: '150+ Students',
      metaIcon: null,
      metaColor: 'text-slate-500',
      icon: GraduationCap,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-50',
    },
    {
      id: 5,
      name: 'Clean Water DAO',
      description: 'Community-governed funding for water purification systems in developing regions utilizing IoT for verification.',
      requested: '4000 OP',
      meta: 'Verified',
      metaIcon: null,
      metaColor: 'text-slate-500',
      icon: Droplets,
      iconColor: 'text-cyan-500',
      iconBg: 'bg-cyan-600',
    },
    {
      id: 6,
      name: 'HealthGrid Beta',
      description: 'A secure, patient-owned data exchange for medical records, allowing seamless transfer between providers.',
      requested: '6200 OP',
      meta: 'Audit Pending',
      metaIcon: null,
      metaColor: 'text-slate-500',
      icon: Heart,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50',
    }
  ];

  const toggleSelection = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">


        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 transition-colors">
            <div className="w-3 h-3 bg-slate-400 rounded-sm"></div> Polls
          </span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800">Community Grant Round 12</span>
        </div>

        <PollTitle
          title={'Community Grant Round 12'}
          desc="This round focuses on infrastructure and public goods funding for the upcoming quarter.
          Voters must rank their top 3 preferences to participate. Your participation helps shape the future of our ecosystem."
        />

        <InfoBanner startDate={"Oct 12, 2023"} endDate={"Oct 20, 2023"} votingType={3} />

        {/* Candidates Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Candidates</h2>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{candidates.length} Projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => {
            const isSelected = selected.includes(candidate.id);
            const rankIndex = selected.indexOf(candidate.id) + 1;

            return (
              <CandidateCard
                key={candidate.id}
                toggleSelection={toggleSelection}
                candidate={candidate}
                isSelected={isSelected}
                rankIndex={rankIndex}
              />
            );
          })}
        </div>
      </main>
      <FloatingBar selected={selected} />
    </div>
  );
};

export default PollDetails;
