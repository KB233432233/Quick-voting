
import { useEffect, useState } from 'react';
import { ShieldCheck, Plus, Trash2 } from 'lucide-react';
import { useWriteOnChain } from '../../hooks/WriteOnChain';
import Popup from '../../Components/Popup';
import LoadingOverlay from '../../Components/LoadingOverlay';

const STORAGE_KEY = 'quickvote.admins';

const OwnerView = () => {
  const [admins, setAdmins] = useState([]);
  const [adminName, setAdminName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const { addAdmin, removeAdmin } = useWriteOnChain();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAdmins(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse admin list from storage:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(admins));
  }, [admins]);

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    const trimmedAddress = walletAddress.trim();
    const normalizedAddress = trimmedAddress.toLowerCase();

    if (!trimmedAddress) {
      alert('Please enter a valid wallet address.');
      return;
    }

    if (admins.some((admin) => admin.address.toLowerCase() === normalizedAddress)) {
      alert('That address is already in the admin list.');
      return;
    }

    try {
      setIsAdding(true);
      await addAdmin(trimmedAddress);
      setAdmins((prev) => [
        ...prev,
        {
          id: normalizedAddress,
          name: adminName.trim() || 'Admin',
          address: trimmedAddress
        }
      ]);
      setAdminName('');
      setWalletAddress('');
      alert('Admin added successfully!');
    } catch (e) {
      console.error('Failed to add admin on chain:', e);
      alert('Failed to add admin. Check the console for more info.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveClick = (admin) => {
    setSelectedAdmin(admin);
    setPopupOpen(true);
  };

  const confirmRemove = async () => {
    if (!selectedAdmin || isRemoving) return;

    try {
      setIsRemoving(true);
      await removeAdmin(selectedAdmin.address);
      setAdmins((prev) => prev.filter((admin) => admin.address.toLowerCase() !== selectedAdmin.address.toLowerCase()));
      setPopupOpen(false);
      setSelectedAdmin(null);
      alert('Admin removed successfully.');
    } catch (e) {
      console.error('Failed to remove admin on chain:', e);
      alert('Failed to remove admin. Check the console for more info.');
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <ShieldCheck className="text-blue-500" />
          Add Admin
        </h2>
        <form className="space-y-4 max-w-lg" onSubmit={handleAddAdmin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Admin Name</label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter admin name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Wallet Address / Public Key</label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0x..."
            />
          </div>
          <button
            type="submit"
            disabled={isAdding}
            className={`flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto ${isAdding ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            <Plus size={18} />
            {isAdding ? 'Adding...' : 'Add Admin'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-blue-500" />
            Admins
          </h2>
        </div>
        <div className="p-0">
          {admins.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No admins added yet.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {admins.map((admin) => (
                <li
                  key={admin.id}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">{admin.name}</h3>
                    <p className="text-xs text-slate-500">{admin.address}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveClick(admin)}
                    disabled={isRemoving}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border ${isRemoving ? 'bg-rose-50 text-rose-300 border-rose-100 cursor-not-allowed' : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200'}`}
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Popup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title="Remove Admin"
        message="Are you sure you want to remove this admin? This action cannot be undone."
        action="Remove Admin"
        confirmDelete={confirmRemove}
        setPopupOpen={setPopupOpen}
      />
      <LoadingOverlay isOpen={isRemoving} label="Removing admin..." />
    </div>
  );
};

export default OwnerView;
