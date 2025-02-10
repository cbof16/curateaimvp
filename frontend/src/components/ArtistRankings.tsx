import React from 'react';
import { demoArtists } from '../data/demoArtists';
import { Star, TrendingUp, Award, Twitter, Instagram } from 'lucide-react';

const ArtistRankings = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {demoArtists.map((artist) => (
        <div 
          key={artist.id}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-black to-gray-900 p-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative overflow-hidden rounded-lg">
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
            
            <div className="absolute top-4 left-4">
              <div className="flex items-center space-x-2 bg-black/60 rounded-full px-3 py-1">
                <Award className="w-4 h-4 text-red-500" />
                <span className="text-white font-bold">#{artist.rank}</span>
              </div>
            </div>

            <div className="absolute bottom-0 w-full p-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{artist.name}</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 font-bold">{artist.hypeScore}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-500 font-bold">
                        +{artist.engagementScore}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <a href={`https://twitter.com/${artist.twitterHandle}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href={`https://instagram.com/${artist.instagramHandle}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 border border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300 rounded-lg pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};

export default ArtistRankings;