const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const socialBotService = require('../services/socialBotService');

router.post('/create', auctionController.createAuction);
router.get('/:id', auctionController.getAuctionDetails);
router.get('/:id/price', auctionController.getCurrentPrice);
router.post('/:id/buy', auctionController.buyAuction);
router.delete('/:id/cancel', auctionController.cancelAuction);

router.post('/promote-auction', async (req, res) => {
  const { artworkName, artist, price } = req.body;
  const message = socialBotService.generatePromotionalMessage(artworkName, artist, price);
  await socialBotService.postTweet(message);
  res.status(200).send({ message: 'Promotion posted successfully' });
});

module.exports = router;
