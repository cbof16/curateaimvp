import React from 'react';
import { ChevronDown, Gavel, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const artworks = [
    "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80"
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_3px,transparent_3px),linear-gradient(to_bottom,#000_3px,transparent_3px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-red-500/30 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] bg-purple-500/30 rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Artwork */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            <div className="relative overflow-hidden rounded-lg aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              {artworks.map((url, index) => (
                <img
                  key={url}
                  src={url}
                  alt={`Featured Artwork ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  style={{
                    animation: `fadeInOut 15s infinite ${index * 5}s`,
                    opacity: index === 0 ? 1 : 0
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight glitch-text">
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-purple-500 text-transparent bg-clip-text">
                Art Curation & NFT Auctions
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-xl">
              Discover, auction, and promote digital art with AI-driven precision.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('auctions')}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center space-x-2"
              >
                <Gavel className="w-5 h-5" />
                <span>Start Bidding</span>
              </button>
              <button
                onClick={() => scrollToSection('trending-artists')}
                className="px-8 py-3 bg-black border border-red-500 rounded-lg font-semibold hover:bg-red-500/10 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Discover Artists</span>
              </button>
            </div>

            <p className="text-sm text-gray-500 typing-text">
              Empowering emerging artists through AI and blockchain.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;