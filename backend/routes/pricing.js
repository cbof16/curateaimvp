const express = require('express');
const router = express.Router();
const { predictStartingBid } = require('../services/pricingAI');

router.get('/predict-price', (req, res) => {
  const artistId = req.query.artist_id;
  if (!artistId) {
    return res.status(400).json({ error: 'artist_id is required' });
  }

  const predictedPrice = predictStartingBid(artistId);
  res.json({ predictedPrice });
});

module.exports = router;
