import React from 'react';
import { Star, Twitter, Instagram } from 'lucide-react';

interface ArtistCardProps {
  name: string;
  imageUrl: string;
  hypeScore: number;
}

const ArtistCard = ({ name, imageUrl, hypeScore }: ArtistCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-black to-gray-900 p-1">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
        
        <div className="absolute bottom-0 w-full p-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
              <div className="flex items-center space-x-2">
                <Twitter className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                <Instagram className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-red-500" />
              <span className="text-red-500 font-bold">{hypeScore}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 border border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300 rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default ArtistCard;