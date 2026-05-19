import { Loader2 } from 'lucide-react';

const LoadingOverlay = ({ isOpen, label = 'Processing...' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-lg border border-slate-200">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
