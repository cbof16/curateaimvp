const { generatePromotionalMessage, postTweet } = require('../services/socialBotService');

/**
 * Checks auctions and triggers promotional tweets if conditions are met.
 * For simulation, an auction object is created directly.
 */
async function checkAndPromoteAuctions() {
  // Simulated auction data
  const auction = {
    artworkName: "Sunset Overdrive",
    artist: "Alice Doe",
    price: 2.5,
    predictedPrice: 5.0,
    highestBid: 3.0 // Represents a bid exceeding 50% of the predicted price
  };

  // Check if the highest bid exceeds 50% of the predicted price
  if (auction.highestBid >= auction.predictedPrice * 0.5) {
    const message = generatePromotionalMessage(auction.artworkName, auction.artist, auction.price);
    try {
      const response = await postTweet(message);
      console.log("Promotion response:", response);
    } catch (error) {
      console.error("Promotion failed:", error.message);
    }
  } else {
    console.log("No promotion triggered: bid condition not met.");
  }
}

module.exports = { checkAndPromoteAuctions };
