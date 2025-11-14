import React from 'react';
import { Shield, Key, Smartphone, Globe, Clock } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Security</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Security */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Account Security
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">Password</p>
                  <p className="text-sm text-gray-500">Last updated 3 months ago</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Change
              </button>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-green-600">Enabled</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Manage
              </button>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">Login Sessions</p>
                  <p className="text-sm text-gray-500">2 active sessions</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Data Protection
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Auto-Delete Enabled</h4>
              <p className="text-sm text-green-700">
                All uploaded files are automatically encrypted and deleted after 24 hours for your security.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Data Export</h4>
              <p className="text-sm text-blue-700 mb-3">
                Download all your analysis data and reports before they expire.
              </p>
              <button className="text-blue-700 font-medium text-sm hover:underline">
                Export Data
              </button>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Privacy Settings</h4>
              <p className="text-sm text-yellow-700 mb-3">
                Manage how your data is processed and stored.
              </p>
              <button className="text-yellow-700 font-medium text-sm hover:underline">
                Review Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;