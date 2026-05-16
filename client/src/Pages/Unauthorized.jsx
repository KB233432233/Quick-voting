

import { Link } from 'react-router';
import { ShieldAlert } from 'lucide-react';

function Unauthorized() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="bg-white/5 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-white/10 backdrop-blur-sm">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-500/20 rounded-full">
            <ShieldAlert className="w-16 h-16 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Access Denied
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You don't have the necessary permissions to view this page. Please return to the homepage or log in with the correct account.
        </p>
        
        <Link 
          to="/PollList"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 w-full shadow-lg shadow-blue-500/30"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized
