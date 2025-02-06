const historicalData = require('../data/historicalData');
const socialMetrics = require('../data/socialMetrics');

function calculateHypeScore(artistId) {
  const artistMetrics = socialMetrics.find(metric => metric.artistId === artistId);
  return artistMetrics ? artistMetrics.hypeScore : 0;
}

function predictStartingBid(artistId) {
  const artistSales = historicalData.filter(data => data.artistId === artistId);
  const averageSalePrice = artistSales.reduce((sum, sale) => sum + sale.price, 0) / artistSales.length;
  const hypeScore = calculateHypeScore(artistId);

  const predictedPrice = averageSalePrice * (1 + hypeScore / 100);
  return predictedPrice;
}

module.exports = {
  predictStartingBid,
};
