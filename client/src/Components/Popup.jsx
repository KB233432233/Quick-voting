
import { X } from 'lucide-react';

function Popup({ isOpen, onClose, title, message, action, confirmDelete, setPopupOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col transform transition-all">
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          {title && <h3 className="font-semibold text-lg text-slate-800">{title}</h3>}
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
            <p className="text-slate-600 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
            <button 
                onClick={() => setPopupOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
                Cancel
            </button>
            <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium"
            >
                {action}
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
