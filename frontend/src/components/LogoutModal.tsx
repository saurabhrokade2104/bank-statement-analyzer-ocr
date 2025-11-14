import React, { useState } from 'react';
import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose, onLogout }) => {
  const [signOutFromAll, setSignOutFromAll] = useState(false);
  const [note, setNote] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <LogOut className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Sign out </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            
            
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            You will be redirected to the login screen after signing out.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;