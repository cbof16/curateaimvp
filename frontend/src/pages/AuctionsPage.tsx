import React, { useState } from 'react';
import { demoAuctions } from '../data/demoAuctions';
import AuctionCard from '../components/AuctionCard';
import LoadingCard from '../components/LoadingCard';
import NFTDetailModal from '../components/NFTDetailModal';
import { Search, SlidersHorizontal } from 'lucide-react';

const AuctionsPage = () => {
  const [isLoading] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<typeof demoAuctions[0] | null>(null);
  const [auctions, setAuctions] = useState(demoAuctions);

  const handlePlaceBid = (amount: string) => {
    if (selectedAuction) {
      // Update the auction with the new bid
      const updatedAuctions = auctions.map(auction => {
        if (auction.id === selectedAuction.id) {
          return {
            ...auction,
            currentPrice: `${amount} AVAX`,
            bidCount: auction.bidCount + 1,
            lastBidTime: new Date().toISOString()
          };
        }
        return auction;
      });

      setAuctions(updatedAuctions);
      setSelectedAuction(null);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text">
            Live Auctions
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Bid on unique digital artworks from emerging AI artists
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search auctions..."
              className="w-full bg-black/50 border border-red-500/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-black/50 border border-red-500/20 rounded-lg hover:border-red-500/50 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-red-500" />
            <span className="text-white">Filters</span>
          </button>
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          ) : (
            auctions.map((auction) => (
              <div key={auction.id} onClick={() => setSelectedAuction(auction)}>
                <AuctionCard auction={auction} />
              </div>
            ))
          )}
        </div>

        {/* NFT Detail Modal */}
        <NFTDetailModal
          auction={selectedAuction}
          isOpen={!!selectedAuction}
          onClose={() => setSelectedAuction(null)}
          onPlaceBid={handlePlaceBid}
        />
      </div>
    </div>
  );
};

export default AuctionsPage;