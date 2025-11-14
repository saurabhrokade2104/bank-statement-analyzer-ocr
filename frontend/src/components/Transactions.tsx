import React, { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 2;

  const transactions = [
    { date: '2024-06-15', description: 'Amazon Purchase', category: 'Shopping', amount: '-₹2,450', type: 'debit' },
    { date: '2024-06-14', description: 'Salary Credit', category: 'Income', amount: '+₹45,000', type: 'credit' },
    { date: '2024-06-13', description: 'Swiggy Food Delivery', category: 'Food', amount: '-₹340', type: 'debit' },
    { date: '2024-06-12', description: 'Netflix Subscription', category: 'Entertainment', amount: '-₹199', type: 'debit' },
    { date: '2024-06-11', description: 'ATM Withdrawal', category: 'Cash', amount: '-₹5,000', type: 'debit' },
    { date: '2024-06-10', description: 'Electricity Bill', category: 'Utilities', amount: '-₹1,250', type: 'debit' },
  ];

  // --- Filter transactions by search ---
  const filteredTransactions = transactions.filter(tx =>
    tx.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Pagination calculations ---
  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // --- CSV Export ---
  const exportCSV = () => {
    const header = ['Date', 'Description', 'Category', 'Amount'];
    const rows = filteredTransactions.map(tx => [tx.date, tx.description, tx.category, tx.amount]);
    
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += header.join(',') + '\n';
    rows.forEach(row => csvContent += row.join(',') + '\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 space-y-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 flex-1">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>

            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </button>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-sm font-medium text-gray-600 px-6 py-4">Date</th>
              <th className="text-left text-sm font-medium text-gray-600 px-6 py-4">Description</th>
              <th className="text-left text-sm font-medium text-gray-600 px-6 py-4">Category</th>
              <th className="text-right text-sm font-medium text-gray-600 px-6 py-4">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentTransactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                    {transaction.category}
                  </span>
                </td>
                <td
                  className={`px-6 py-4 text-sm text-right font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredTransactions.length)} of {filteredTransactions.length} transactions
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-2 rounded-lg text-sm ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
