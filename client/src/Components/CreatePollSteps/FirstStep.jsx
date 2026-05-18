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
              required
              onChange={(e) => setFormData('title', e.target.value)}
              type="text"
              placeholder="e.g. Q4 Team Building Event Location"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder:text-slate-400 transition-all shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Voters Addresses <span className="text-slate-400 font-normal">(Upload CSV)</span>
            </label>
            <input
              type="file"
              accept=".csv"
              required
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                    // setFormData('auditorFile', file);
                    
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const csvData = event.target.result;
                      // Split by newlines and commas, trim whitespace, and filter out empty strings
                      const parsedArray = csvData
                        .split(/[\r\n]+/)
                        .flatMap(line => line.split(','))
                        .map(item => item.trim())
                        .filter(item => item.length > 0);
                      
                      setFormData('VotersAddresses', parsedArray);
                      console.log('Parsed Voters Addresses:', parsedArray);
                    };
                    reader.readAsText(file);
                  } else {
                    alert('Please upload a valid CSV file.');
                    e.target.value = null; // Clear the input
                  }
                }
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all shadow-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.auditorFile && (
              <div className="text-right text-[11px] font-medium text-slate-500 mt-1">
                Selected: {formData.auditorFile.name}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-end">
        <button
          onClick={onNext}
          disabled={!formData.title || formData.VotersAddresses.length === 0}
          className={`flex items-center gap-2 ${!formData.title || formData.VotersAddresses.length === 0 ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors`}
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FirstStep;