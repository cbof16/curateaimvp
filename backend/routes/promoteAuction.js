'use strict';
const express = require('express');
const router = express.Router();
const socialBotService = require('../services/socialBotService');

/**
 * POST /api/promote-auction
 * Expects JSON body with "auction" object containing:
 *  - artworkName: string
 *  - artist: string
 *  - price: number|string (ETH value)
 */
router.post('/', async (req, res) => {
  try {
    const auction = req.body.auction;
    if (!auction) {
      return res.status(400).json({ error: 'Auction details missing' });
    }
    const message = socialBotService.generatePromoMessage(auction);
    const tweetResult = await socialBotService.postTweet(message);
    res.json({ success: true, tweet: tweetResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
