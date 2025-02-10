import React, { useState } from 'react';
import { History, ArrowUpRight, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'bid' | 'purchase' | 'sale';
  nftTitle: string;
  amount: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  outcome?: 'win' | 'loss';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'bid',
    nftTitle: 'Cyberpunk Dreams #137',
    amount: '8.5 AVAX',
    status: 'confirmed',
    timestamp: '2025-02-28T10:30:00Z',
    outcome: 'win'
  },
  {
    id: '2',
    type: 'purchase',
    nftTitle: 'Neon Cityscape #42',
    amount: '5.0 AVAX',
    status: 'confirmed',
    timestamp: '2025-02-27T15:45:00Z'
  },
  {
    id: '3',
    type: 'bid',
    nftTitle: 'Digital Dystopia #89',
    amount: '3.8 AVAX',
    status: 'pending',
    timestamp: '2025-02-28T09:15:00Z'
  },
  {
    id: '4',
    type: 'sale',
    nftTitle: 'Virtual Reality #21',
    amount: '12.0 AVAX',
    status: 'confirmed',
    timestamp: '2025-02-26T18:20:00Z'
  }
];

const TransactionHistoryPage = () => {
  const [currentPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'bids' | 'purchases' | 'sales'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bid':
        return '🎯';
      case 'purchase':
        return '💎';
      case 'sale':
        return '💰';
      default:
        return '📝';
    }
  };

  const filteredTransactions = mockTransactions.filter(tx => 
    filter === 'all' ? true : tx.type === filter
  );

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg blur-xl"></div>
          <div className="relative bg-black/50 border border-red-500/20 rounded-lg p-8">
            <div className="flex items-center space-x-4">
              <History className="w-8 h-8 text-red-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Transaction History
              </h1>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {['all', 'bids', 'purchases', 'sales'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2
                ${filter === f 
                  ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                  : 'bg-black/50 border border-red-500/20 text-gray-400 hover:border-red-500/50'
                }`}
            >
              <Filter className="w-4 h-4" />
              <span className="capitalize">{f}</span>
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
              <div className="relative bg-black/50 border border-red-500/20 rounded-lg p-6 hover:border-red-500/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getTypeIcon(tx.type)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{tx.nftTitle}</h3>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className={getStatusColor(tx.status)}>{tx.status}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">
                          {new Date(tx.timestamp).toLocaleDateString()} at{' '}
                          {new Date(tx.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white mb-1">{tx.amount}</div>
                    {tx.outcome && (
                      <span className={`text-sm ${
                        tx.outcome === 'win' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {tx.outcome.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button className="p-2 rounded-lg bg-black/50 border border-red-500/20 text-gray-400 hover:border-red-500/50 transition-all duration-200">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-gray-400">Page {currentPage}</span>
          <button className="p-2 rounded-lg bg-black/50 border border-red-500/20 text-gray-400 hover:border-red-500/50 transition-all duration-200">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;