const { predictStartingBid } = require('./services/pricingAI');

const artistId = 1; // Example artist ID
const predictedPrice = predictStartingBid(artistId);

console.log(`Predicted starting bid for artist ${artistId}: $${predictedPrice.toFixed(2)}`);
