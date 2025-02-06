import React, { useEffect, useState } from 'react';
import { getAuctionDetails, getCurrentPrice, buyAuction, cancelAuction } from '../services/auctionService';

const AuctionCard = ({ auctionId }: { auctionId: string }) => {
  const [auctionDetails, setAuctionDetails] = useState<any>(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      const details = await getAuctionDetails(auctionId);
      setAuctionDetails(details);
    };

    const fetchCurrentPrice = async () => {
      const price = await getCurrentPrice(auctionId);
      setCurrentPrice(price);
    };

    fetchAuctionDetails();
    fetchCurrentPrice();
  }, [auctionId]);

  const handleBuy = async () => {
    const buyerAddress = '0xYourBuyerAddress'; // Replace with actual buyer address
    await buyAuction(auctionId, buyerAddress);
    alert('Auction bought successfully!');
  };

  const handleCancel = async () => {
    await cancelAuction(auctionId);
    alert('Auction cancelled successfully!');
  };

  if (!auctionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="auction-card">
      <h3>{auctionDetails.title}</h3>
      <p>Current Price: {currentPrice} ETH</p>
      <button onClick={handleBuy}>Buy</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default AuctionCard;
