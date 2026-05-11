import { useState } from 'react';
import { Building2, Check, X, List } from 'lucide-react';
import RegisteredOrgs from '../../Components/Admin/OrgView/RegisteredOrgs';
import PendingRequests from '../../Components/Admin/OrgView/PendingRequests';

const OrganizationsView = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Acme Corp', legalName: 'Acme Corporation LLC', taxId: 'TAX-12345', address: '123 Main St', email: 'contact@acme.com', walletAddress: '0x123...abc', status: 'Pending' },
    { id: 2, name: 'Global Tech', legalName: 'Global Tech Inc', taxId: 'TAX-67890', address: '456 Tech Blvd', email: 'hello@globaltech.io', walletAddress: '0x456...def', status: 'Pending' },
  ]);

  const [organizations, setOrganizations] = useState([]);

  const handleApprove = (request) => {
    setOrganizations([...organizations, { ...request, status: 'Approved' }]);
    setRequests(requests.filter(req => req.id !== request.id));
  };

  const handleReject = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  return (
    <div className="space-y-6">
      <PendingRequests handleApprove={handleApprove} handleReject={handleReject} requests={requests} />

      <RegisteredOrgs organizations={organizations} />
    </div>
  );
};

export default OrganizationsView;