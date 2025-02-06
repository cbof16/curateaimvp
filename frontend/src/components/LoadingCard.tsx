import React from 'react';

const LoadingCard = () => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-black to-gray-900 p-1">
      <div className="h-full w-full animate-pulse">
        <div className="aspect-w-1 aspect-h-1 bg-gray-800"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 w-full p-4">
          <div className="space-y-3">
            <div className="h-6 w-3/4 bg-gray-800 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 border border-red-500/20 rounded-lg"></div>
    </div>
  );
};

export default LoadingCard;