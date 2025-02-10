import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { Wallet, Loader } from 'lucide-react';

const WalletConnectButton = () => {
  const { address, isConnecting, connect, disconnect } = useWallet();

  if (isConnecting) {
    return (
      <button 
        disabled
        className="px-4 py-2 bg-black/50 border border-red-500/50 rounded-lg flex items-center space-x-2 animate-pulse cursor-wait"
      >
        <Loader className="w-4 h-4 animate-spin text-red-500" />
        <span className="text-gray-300">Connecting...</span>
      </button>
    );
  }

  if (address && typeof address === 'string') {
    return (
      <button
        onClick={disconnect}
        className="group px-4 py-2 bg-black/50 border border-red-500/50 rounded-lg hover:bg-red-500/10 hover:border-red-500/70 transition-all duration-200 flex items-center space-x-2"
        title="Click to disconnect"
      >
        <Wallet className="w-4 h-4 text-red-500 group-hover:animate-pulse" />
        <span className="text-sm font-mono text-gray-300 group-hover:text-white">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center space-x-2"
    >
      <Wallet className="w-4 h-4" />
      <span>Connect Wallet</span>
    </button>
  );
};

export default WalletConnectButton;