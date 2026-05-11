import { useState } from 'react';
import Header from '../../Components/AuditorDashboard/Header';
import PollList from '../../Components/AuditorDashboard/PollList';
import PollDetails from '../../Components/AuditorDashboard/PollDetails';

const mockPolls = [
  { id: '1', title: 'Student Council Election 2024', status: 'Completed', totalVotes: 145 },
  { id: '2', title: 'Curriculum Update Referendum', status: 'Active', totalVotes: 89 },
  { id: '3', title: 'Facility Improvement Votes', status: 'Active', totalVotes: 231 },
];

const mockVotes = [
  { id: 'tx-0x12..3a', voterHash: '0x8f2...9c21', candidate: 'Alice Johnson', timestamp: '2024-03-12 14:22:11' },
  { id: 'tx-0x45..1b', voterHash: '0x1b4...7d4f', candidate: 'Bob Smith', timestamp: '2024-03-12 14:25:04' },
  { id: 'tx-0x78..9c', voterHash: '0x9d3...2a1b', candidate: 'Alice Johnson', timestamp: '2024-03-12 14:30:45' },
  { id: 'tx-0x89..0d', voterHash: '0xc5a...8f3c', candidate: 'Charlie Davis', timestamp: '2024-03-12 14:35:10' },
  { id: 'tx-0xab..ef', voterHash: '0xe7f...1b2c', candidate: 'Alice Johnson', timestamp: '2024-03-12 14:40:22' },
];

const AuditorDashboard = () => {
  const [selectedPoll, setSelectedPoll] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        <Header />

        {!selectedPoll ? (
          /* Polls List */
          <PollList mockPolls={mockPolls} setSelectedPoll={setSelectedPoll} />
        ) : (
          /* Poll Details / Votes List */
           <PollDetails selectedPoll={selectedPoll} setSelectedPoll={setSelectedPoll} mockVotes={mockVotes} />
        )}

      </div>
    </div>
  );
};

export default AuditorDashboard;