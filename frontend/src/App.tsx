import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ArtistCard from './components/ArtistCard';
import HeroSection from './components/HeroSection';
import LoadingCard from './components/LoadingCard';
import AboutSection from './components/AboutSection';
import { useVeniceArt } from './hooks/useVeniceArt';

function App() {
  const { artworks, loading, error, isUsingDemoData } = useVeniceArt();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      );
    }

    if (error && !isUsingDemoData) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <>
        {isUsingDemoData && (
          <div className="mb-8 p-4 border border-red-500/50 rounded-lg bg-red-500/10">
            <p className="text-red-400 text-center">
              ⚠️ Network error: Showing pre-generated showcase artworks
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <ArtistCard
              key={artwork.id}
              name={artwork.artistName}
              imageUrl={artwork.imageUrl}
              hypeScore={artwork.hypeScore}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
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
            
            {renderContent()}
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
            
            <div className="text-center py-12 border border-red-500/20 rounded-lg bg-red-500/5">
              <p className="text-gray-400">
                Auctions coming soon! Stay tuned for exclusive digital art pieces.
              </p>
            </div>
          </section>

          <AboutSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;