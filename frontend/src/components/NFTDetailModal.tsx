import React from 'react';
import { X, Gavel, User, Clock, History } from 'lucide-react';
import { DemoAuction } from '../data/demoAuctions';

interface NFTDetailModalProps {
  auction: DemoAuction | null;
  isOpen: boolean;
  onClose: () => void;
  onPlaceBid: (amount: string) => void;
}

const NFTDetailModal: React.FC<NFTDetailModalProps> = ({ auction, isOpen, onClose, onPlaceBid }) => {
  const [bidAmount, setBidAmount] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen || !auction) return null;

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numericBid = parseFloat(bidAmount);
    const currentPrice = parseFloat(auction.currentPrice.split(' ')[0]);

    if (isNaN(numericBid) || numericBid <= 0) {
      setError('Please enter a valid bid amount');
      return;
    }

    if (numericBid <= currentPrice) {
      setError(`Bid must be higher than current price (${auction.currentPrice})`);
      return;
    }

    onPlaceBid(bidAmount);
    setBidAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-black border border-red-500/20 shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative">
            <img
              src={auction.imageUrl}
              alt={auction.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                {auction.title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Artist Info */}
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-red-500" />
                <span className="text-gray-400">Artist: {auction.artist}</span>
              </div>

              {/* Current Price */}
              <div className="flex items-center space-x-3">
                <Gavel className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-gray-400">Current Price</p>
                  <p className="text-xl font-bold text-white">{auction.currentPrice}</p>
                </div>
              </div>

              {/* Time Left */}
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-gray-400">Auction Ends In</p>
                  <p className="text-white font-mono">{auction.endTime}</p>
                </div>
              </div>

              {/* Bid History */}
              <div className="flex items-center space-x-3">
                <History className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-gray-400">Total Bids</p>
                  <p className="text-white">{auction.bidCount} bids</p>
                </div>
              </div>

              {/* Place Bid Form */}
              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div>
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Bid (AVAX)
                  </label>
                  <input
                    type="number"
                    id="bidAmount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    step="0.1"
                    min="0"
                    className="w-full bg-black/50 border border-red-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50"
                    placeholder="Enter bid amount"
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center justify-center space-x-2"
                >
                  <Gavel className="w-5 h-5" />
                  <span>Place Bid</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetailModal;