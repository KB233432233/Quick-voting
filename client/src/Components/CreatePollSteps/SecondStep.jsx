import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown } from 'lucide-react';

const SecondStep = ({ onNext, onBack, formData, setFormData }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-8 pb-6 flex-1">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Configuration</h2>
        <p className="text-sm text-slate-500 mb-8">Set the rules and timeline.</p>

        <div className="space-y-6">

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Voting Strategy</label>
            <div className="relative">
              <select
                value={formData.votingStrategy}
                onChange={(e) => setFormData('votingStrategy', e.target.value)}
                className="appearance-none w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800 transition-all shadow-sm bg-white">
                <option>Ranked Choice</option>
                {/* <option>Single Choice</option> */}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Max Rankings Allowed</label>
            <input
              value={formData.maxRankings}
              onChange={(e) => setFormData('maxRankings', e.target.value)}
              type="number"
              defaultValue={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800 transition-all shadow-sm"
            />
            <p className="text-[11px] text-slate-500 mt-1.5 font-medium">Voters can rank up to this many options.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Start Date & Time</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <DatePicker
                  // type="date"
                  selected={formData.startDate}
                  onChange={(e) => setFormData('startDate', e)}
                  placeholderText="mm/dd/yyyy, --:-- --"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800 transition-all shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">End Date & Time</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <DatePicker
                  // type="date"
                  selected={formData.endDate}
                  onChange={(date) => setFormData('endDate', date)}
                  placeholderText="mm/dd/yyyy, --:-- --"
                  dateFormat="MM/dd/yyyy"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* <div className="mt-8 bg-[#F8FAFC] p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-0.5">Anonymous Voting</h4>
              <p className="text-xs text-slate-500">Hide voter identities in the final report</p>
            </div>
            
            <div className="w-11 h-6 bg-slate-200 rounded-full flex items-center px-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div> */}

        </div>
      </div>

      <div className="px-8 py-5 border-t border-slate-100 flex justify-between bg-slate-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
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

export default SecondStep;