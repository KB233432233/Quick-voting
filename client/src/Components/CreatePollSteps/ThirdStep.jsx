import { useState } from 'react';
import { ArrowLeft, GripVertical, Trash2, Plus, Rocket } from 'lucide-react';

const ThirdStep = ({ onBack, formData, setFormData }) => {
  const [options, setOptions] = useState(formData.options);

  const validate = () => {
    if (options.length < formData.maxRankings) return 0;
    else return 1
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-8 pb-6 flex-1">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Poll Options</h2>
        <p className="text-sm text-slate-500 mb-8">Add the choices available for voting.</p>

        <div className="space-y-4">

          {options.map((opt, idx) => (
            <div key={opt.id} className="flex items-center gap-3">
              <GripVertical className="w-5 h-5 text-slate-300 cursor-grab shrink-0" />
              <input
                type="text"
                defaultValue={opt.text}
                // onChange={}
                placeholder="Enter option text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800 transition-all shadow-sm"
              />
              <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors shrink-0">
                <Trash2 onClick={() => setOptions(options.filter((_, i) => i !== idx))} className="w-5 h-5" />
              </button>
            </div>
          ))}

          <button
            onClick={() => setOptions([...options, { id: options.length + 1, text: '' }])}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-bold mt-4 pt-2 transition-colors">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <Plus className="w-3.5 h-3.5" />
            </div>
            Add Another Option
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
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
            Deploy Poll <Rocket className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;