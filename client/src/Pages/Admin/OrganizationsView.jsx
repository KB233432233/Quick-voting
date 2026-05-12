import { useState } from 'react';
import { Building2, Check, X, List } from 'lucide-react';
import RegisteredOrgs from '../../Components/Admin/OrgView/RegisteredOrgs';
import PendingRequests from '../../Components/Admin/OrgView/PendingRequests';
import Popup from '../../Components/Popup';
import { useWriteOnChain } from '../../hooks/WriteOnChain';

const OrganizationsView = () => {
  const [requests, setRequests] = useState([]);

  const [organizations, setOrganizations] = useState([]);
  const [rejectPopupOpen, setRejectPopupOpen] = useState(false);
  const [selectedRequestToReject, setSelectedRequestToReject] = useState(null);
  
  const { addOrganization } = useWriteOnChain();

  const handleApprove = async (request) => {
    try {
      await addOrganization(request.walletAddress);
      setOrganizations([...organizations, { ...request, status: 'Approved' }]);
      setRequests(requests.filter(req => req.id !== request.id));
    } catch (e) {
      console.error("Failed to approve organization on chain:", e);
      alert("Failed to approve organization. Check the console for more info.");
    }
  };

  const handleRejectClick = (id) => {
    setSelectedRequestToReject(id);
    setRejectPopupOpen(true);
  };

  const confirmReject = () => {
    if (selectedRequestToReject) {
      setRequests(requests.filter(req => req.id !== selectedRequestToReject));
      setRejectPopupOpen(false);
      setSelectedRequestToReject(null);
    }
  };

  return (
    <div className="space-y-6">
      <PendingRequests handleApprove={handleApprove} handleReject={handleRejectClick} requests={requests} />

      <RegisteredOrgs organizations={organizations} />

      <Popup 
        isOpen={rejectPopupOpen} 
        onClose={() => setRejectPopupOpen(false)} 
        title="Reject Request"
      >
        <p className="text-slate-600 mb-6">Are you sure you want to reject this organization request? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => setRejectPopupOpen(false)}
            className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={confirmReject}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium"
          >
            Reject Request
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default OrganizationsView;