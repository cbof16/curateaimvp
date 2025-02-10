import React, { useState, useEffect } from 'react';
import { DemoAuction } from '../data/demoAuctions';
import { Clock, Gavel, History, Timer } from 'lucide-react';

interface AuctionCardProps {
  auction: DemoAuction;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTime = new Date(auction.endTime).getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft('Auction ended');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [auction.endTime]);

  return (
    <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-black to-gray-900 p-1 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={auction.imageUrl}
            alt={auction.title}
            className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
        
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-2 bg-black/60 rounded-full px-3 py-1">
            <Timer className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-white font-mono text-sm">
              {timeLeft}
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">{auction.title}</h3>
            <p className="text-gray-400">by {auction.artist}</p>
            
            <div className="flex justify-between items-end">
              <div>
                <div className="text-sm text-gray-400">Current Price</div>
                <div className="text-xl font-bold text-red-500">{auction.currentPrice}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <History className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-400">{auction.bidCount} bids</span>
                </div>
              </div>
              
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center space-x-2">
                <Gavel className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 border border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300 rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default AuctionCard;