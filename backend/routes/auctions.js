const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');

router.post('/create', auctionController.createAuction);
router.get('/:id', auctionController.getAuctionDetails);
router.get('/:id/price', auctionController.getCurrentPrice);
router.post('/:id/buy', auctionController.buyAuction);
router.delete('/:id/cancel', auctionController.cancelAuction);

module.exports = router;
