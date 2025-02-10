import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  History, 
  Gavel, 
  Clock,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

const mockTransactions = [
  {
    id: 1,
    type: 'bid',
    amount: '0.5 ETH',
    artworkName: 'Neon Dreams #1337',
    timestamp: '2025-02-15T14:30:00Z',
    status: 'success'
  },
  {
    id: 2,
    type: 'purchase',
    amount: '1.2 ETH',
    artworkName: 'Digital Dystopia #42',
    timestamp: '2025-02-14T09:15:00Z',
    status: 'success'
  }
];

const ProfilePage = () => {
  const { address } = useWallet();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!address) {
      navigate('/');
    }
  }, [address, navigate]);

  if (!address) return null;

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg blur-xl"></div>
          <div className="relative bg-black/50 border border-red-500/20 rounded-lg p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-blue-500 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">Your Profile</h1>
                <div className="flex items-center space-x-2 bg-black/50 rounded-full px-4 py-1 border border-red-500/20">
                  <span className="text-red-500">{address}</span>
                  <ArrowUpRight className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Bids', value: '12', icon: Gavel },
            { label: 'Active Auctions', value: '3', icon: Clock },
            { label: 'Completed Trades', value: '8', icon: History }
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg blur-xl"></div>
              <div className="relative bg-black/50 border border-red-500/20 rounded-lg p-6 hover:border-red-500/40 transition-colors">
                <stat.icon className="w-8 h-8 text-red-500 mb-4 group-hover:animate-pulse" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Transaction History */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg blur-xl"></div>
          <div className="relative bg-black/50 border border-red-500/20 rounded-lg p-8">
            <h2 className="text-xl font-bold text-white mb-6">Transaction History</h2>
            <div className="space-y-4">
              {mockTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                  <div className="relative bg-black/30 border border-red-500/10 rounded-lg p-4 hover:border-red-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          {tx.type === 'bid' ? (
                            <Gavel className="w-4 h-4 text-red-500" />
                          ) : (
                            <History className="w-4 h-4 text-blue-500" />
                          )}
                          <span className="text-white font-semibold">
                            {tx.type === 'bid' ? 'Placed Bid' : 'Purchase'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">{tx.artworkName}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-mono">{tx.amount}</div>
                        <div className="text-sm text-gray-400">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;