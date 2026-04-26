import React , { useState } from 'react';
import { Check } from 'lucide-react';
import FirstStep from '../Components/CreatePollSteps/FirstStep';
import SecondStep from '../Components/CreatePollSteps/SecondStep';
import ThirdStep from '../Components/CreatePollSteps/ThirdStep';
import { Link } from 'react-router';
import { useWriteOnChain } from '../hooks/WriteOnChain';

const CreatePoll = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const { createNewPoll } = useWriteOnChain();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map frontend data to smart contract parameters
      const candidateNames = formData.candidates.map(c => c.name);
      const candidateAddresses = formData.candidates.map(c => c.address);
      const auditorAddresses = formData.auditors
        .split(',')
        .map(a => a.trim())
        .filter(a => a !== '');
      
      const voteType = formData.votingStrategy === 'Ranked Choice' ? 0 : 1; 

      const data = {
        title: formData.title,
        candidateAddresses: candidateAddresses,
        candidateNames: candidateNames,
        auditorAddresses: auditorAddresses,
        voteType: voteType,
        startTime: Math.floor(new Date(formData.startDate).getTime() / 1000),
        endTime: Math.floor(new Date(formData.endDate).getTime() / 1000),
        maxChoices: Number(formData.maxRankings)
      }
      createNewPoll(data);
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    auditors: '',
    votingStrategy: 'Ranked Choice',
    maxRankings: 3,
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000),
    candidates: [
      { id: Date.now(), name: 'Alice', address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8' },
      { id: Date.now() + 1, name: 'Bob', address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC' },
      { id: Date.now() + 2, name: 'Charlie', address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906' }
    ]
  });

  const setData = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const steps = [
    { num: 1, label: 'Details' },
    { num: 2, label: 'Configuration' },
    { num: 3, label: 'Options' }
  ];

  return (
    <div className="min-h-screen font-sans pb-20">
      <main className="max-w-200 mx-auto px-4 mt-8">

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to='/' className="cursor-pointer hover:text-slate-800">Home</Link>
          <span className="text-slate-300">/</span>
          <Link to='/pollList' className="cursor-pointer hover:text-slate-800">Polls</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900">Create New Poll</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Create New Poll</h1>
        </div>

        <div className="flex items-center justify-center mb-10 max-w-[600px] mx-auto">
          {steps.map((step, idx) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;

            return (
              <React.Fragment key={step.num}>
                <div className="flex flex-col items-center relative z-10 w-24">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors shadow-sm mb-2 ${isCompleted || isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span className={`text-xs font-bold ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-blue-600' : 'text-slate-400'
                    }`}>
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 -mt-6">
                    <div className={`h-full ${currentStep > idx + 1 ? 'bg-blue-600' : 'bg-slate-200'} transition-all`}></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
          
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
          {currentStep === 1 && <FirstStep formData={formData} setFormData={setData} onNext={handleNext} />}
          {currentStep === 2 && <SecondStep formData={formData} setFormData={setData} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <ThirdStep formData={formData} handleSubmit={handleSubmit} setFormData={setData} onBack={handleBack} />}
        </form>
      </main>
    </div>
  );
};

export default CreatePoll;
