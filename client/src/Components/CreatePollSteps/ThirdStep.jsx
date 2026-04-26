import { useState } from 'react';
import { ArrowLeft, GripVertical, Trash2, Plus, Rocket } from 'lucide-react';

const ThirdStep = ({ onBack, formData, setFormData, handleSubmit }) => {
  const [candidates, setCandidates] = useState(formData.candidates);

  const updateCandidate = (idx, field, value) => {
    const updated = [...candidates];
    updated[idx][field] = value;
    setCandidates(updated);
    // synchronize back to CreatePoll
    setFormData('candidates', updated);
  };

  const addCandidate = () => {
    const newCandidates = [...candidates, { id: Date.now(), name: '', address: '' }];
    setCandidates(newCandidates);
    setFormData('candidates', newCandidates);
  };

  const removeCandidate = (idx) => {
    const updated = candidates.filter((_, i) => i !== idx);
    setCandidates(updated);
    setFormData('candidates', updated);
  };

  const validate = () => {
    if (candidates.length < formData.maxRankings) return 0;
    else return 1
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-8 pb-6 flex-1">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Poll Candidates</h2>
        <p className="text-sm text-slate-500 mb-8">Add the candidates available for voting. Provide their names and designated ETH addresses.</p>

        <div className="space-y-4">

          {candidates.map((cand, idx) => (
            <div key={cand.id} className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
              <GripVertical className="w-5 h-5 text-slate-300 cursor-grab shrink-0 hidden sm:block" />
              
              <div className="flex-1 w-full space-y-2">
                <input
                  type="text"
                  value={cand.name}
                  onChange={(e) => updateCandidate(idx, 'name', e.target.value)}
                  placeholder="Candidate Name (e.g., Alice)"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800 transition-all shadow-sm"
                />
                <input
                  type="text"
                  value={cand.address}
                  onChange={(e) => updateCandidate(idx, 'address', e.target.value)}
                  placeholder="Candidate Address (0x...)"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono focus:border-transparent text-sm text-slate-800 transition-all shadow-sm"
                />
              </div>

              <button 
                onClick={() => removeCandidate(idx)}
                className="p-2 text-slate-300 hover:text-rose-500 transition-colors shrink-0 self-end sm:self-center"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <button
            onClick={addCandidate}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-bold mt-4 pt-2 transition-colors">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <Plus className="w-3.5 h-3.5" />
            </div>
            Add Another Candidate
          </button>

        </div>
      </div>

      <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between bg-slate-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
          <button className="w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
            Save Draft
          </button>
          <button 
            onClick={handleSubmit}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
          >
            Deploy Poll <Rocket className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;