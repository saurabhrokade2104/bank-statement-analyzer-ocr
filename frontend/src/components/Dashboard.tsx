import React, { useRef } from 'react';
import { UploadRef } from './Upload';
import Upload from './Upload';

const Dashboard: React.FC = () => {
  const uploadRef = useRef<UploadRef>(null);

  const handleDashboardUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.handleUpload(); // Call function from Upload component
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
      </div>

      {/* Upload Bank Statement */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-10 flex flex-col space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Upload Bank Statement
        </h2>

        {/* Upload Component */}
        <Upload ref={uploadRef} />

        {/* Dashboard Upload Button */}
        <button
          onClick={handleDashboardUpload}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-base font-semibold"
        >
          Upload (From Dashboard)
        </button>
      </div>
    </div>
  );

  
  
};

export default Dashboard;
