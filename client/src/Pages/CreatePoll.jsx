import React, { useState } from 'react';
import { Check } from 'lucide-react';
import FirstStep from '../Components/CreatePollSteps/FirstStep';
import SecondStep from '../Components/CreatePollSteps/SecondStep';
import ThirdStep from '../Components/CreatePollSteps/ThirdStep';
import { Link } from 'react-router';

const CreatePoll = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    votingStrategy: 'Ranked Choice',
    maxRankings: 3,
    startDate: '',
    endDate: '',
    isAnonymous: false,
    options: [
      { id: 1, text: 'Option 1' },
      { id: 2, text: 'Option 2' },
      { id: 3, text: '' }
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
      <main className="max-w-[800px] mx-auto px-4 mt-8">

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
          {currentStep === 3 && <ThirdStep formData={formData} setFormData={setData} onBack={handleBack} />}
        </form>
      </main>
    </div>
  );
};

export default CreatePoll;
