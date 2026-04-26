import { ArrowRight } from 'lucide-react';

const FirstStep = ({ onNext, formData, setFormData }) => {



  return (
    <div className="flex flex-col h-full">
      <div className="p-8 pb-6 flex-1">
        <h2 className="text-xl font-bold text-slate-900 mb-1">General Information</h2>
        <p className="text-sm text-slate-500 mb-8">Define the core details of your poll.</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Poll title</label>
            <input
              value={formData.title}
              onChange={(e) => setFormData('title', e.target.value)}
              type="text"
              placeholder="e.g. Q4 Team Building Event Location"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-slate-400 transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Description <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData('description', e.target.value)}
              rows={4}
              placeholder="Describe the purpose of this poll and any instructions for voters..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-slate-400 transition-all shadow-sm resize-none"
            />
            <div className="text-right text-[11px] font-medium text-slate-400 mt-1">
              0/500 characters
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Auditor Addresses <span className="text-slate-400 font-normal">(Optional, comma-separated test addresses)</span>
            </label>
            <textarea
              value={formData.auditors}
              onChange={(e) => setFormData('auditors', e.target.value)}
              rows={2}
              placeholder="0xabc..., 0xdef..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-slate-400 transition-all shadow-sm resize-none"
            />
            <div className="text-right text-[11px] font-medium text-slate-400 mt-1">
              Comma-separated list of Ethereum addresses
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-end">
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FirstStep;