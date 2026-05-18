import { useWeb3Auth } from '@web3auth/modal/react';
import { useNavigate } from 'react-router';

function OrgRegistration() {
  const { isConnected } = useWeb3Auth();
  const navigate = useNavigate();

  if (!isConnected) {
   navigate('/signup');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Organization Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your details to register your organization for voting.
          </p>
        </div>
        <form className="mt-8 space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">Organization Name</label>
              <input id="orgName" type="text" placeholder="e.g. Acme Corp" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200" />
            </div>
            <div>
              <label htmlFor="legalName" className="block text-sm font-medium text-gray-700">Legal Name</label>
              <input id="legalName" type="text" placeholder="e.g. Acme Corporation LLC" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200" />
            </div>
            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">Tax ID / Registration Number</label>
              <input id="taxId" type="text" placeholder="Tax ID" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="address" type="text" placeholder="123 Main St, City, Country" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input id="email" type="email" placeholder="contact@acme.com" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200" />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 mt-2">
              Register Organization
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrgRegistration
