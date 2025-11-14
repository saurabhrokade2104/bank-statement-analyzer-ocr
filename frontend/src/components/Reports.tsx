import React from 'react';

interface AnalysisResult {
  title: string;
  note: string;
}

interface ReportsProps {
  results?: AnalysisResult[]; // optional so it won't break if not passed
}

const Reports: React.FC<ReportsProps> = ({ results = [] }) => {
  return (
    <div className="p-4 min-h-screen bg-gray-50 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">Result</h1>
      </div>

      {/* Result Summary Section */}
      <div className="flex flex-col gap-4">
        {results.length > 0 ? (
          results.map((report, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
              <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Chart / Data Placeholder</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">{report.note}</p>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-gray-600">
              
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
