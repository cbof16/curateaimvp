import React from 'react';
import { generateAIArt } from '../services/veniceAIService';
import { FaTwitter as Twitter, FaInstagram as Instagram, FaStar as Star } from 'react-icons/fa';

const ArtistCard = ({ imageUrl, name, hypeScore }: { imageUrl: string, name: string, hypeScore: number }) => {

const handleGenerateArt = async () => {
  try {
    const prompt = "beautiful sunset"; // Example prompt, you can replace it with dynamic input
    const artData = await generateAIArt(prompt);
    console.log('Generated AI Art:', artData);
    // Display the art data in the UI as needed
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};

return (
  <div>
    <button onClick={handleGenerateArt}>Generate AI Art</button>
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
      
      <div className="absolute inset-0 border border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300 rounded-lg pointer-events-none"></div>
    </div>
  </div>
  );
};

export default ArtistCard;
