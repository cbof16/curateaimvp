import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ArtistRankings from '../components/ArtistRankings';
import AuctionCard from '../components/AuctionCard';
import { demoAuctions } from '../data/demoAuctions';

const HomePage = () => {
  const navigate = useNavigate();
  const featuredAuctions = demoAuctions.slice(0, 3); // Show only first 3 auctions

  return (
    <>
      <HeroSection />
      
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 bg-red-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-1/4 h-32 w-32 bg-purple-500/20 rounded-full blur-3xl"></div>
          
          <section id="trending-artists" className="relative pt-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text">
                Trending Artists
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Discover the next generation of digital artists, curated by our AI-powered platform
              </p>
            </div>
            
            <ArtistRankings />
          </section>

          <section id="auctions" className="relative mt-24 pt-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text">
                Live Auctions
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Bid on unique digital artworks from emerging AI artists
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/auctions')}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center space-x-2 mx-auto"
              >
                <span>View All Auctions</span>
              </button>
            </div>
          </section>

          <AboutSection />
        </div>
      </main>
    </>
  );
};

export default HomePage;