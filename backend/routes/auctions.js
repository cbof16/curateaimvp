/**
 * @swagger
 * /api/auctions/create:
 *   post:
 *     summary: Create a new auction
 *     responses:
 *       200:
 *         description: Successfully created auction
 *       500:
 *         description: Failed to create auction
 * /api/auctions/{id}:
 *   get:
 *     summary: Get auction details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The auction ID
 *     responses:
 *       200:
 *         description: Successfully retrieved auction details
 *       500:
 *         description: Failed to retrieve auction details
 * /api/auctions/{id}/price:
 *   get:
 *     summary: Get current auction price
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The auction ID
 *     responses:
 *       200:
 *         description: Successfully retrieved current auction price
 *       500:
 *         description: Failed to retrieve current auction price
 * /api/auctions/{id}/buy:
 *   post:
 *     summary: Buy auction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The auction ID
 *     responses:
 *       200:
 *         description: Successfully bought auction
 *       500:
 *         description: Failed to buy auction
 * /api/auctions/{id}/cancel:
 *   delete:
 *     summary: Cancel auction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The auction ID
 *     responses:
 *       200:
 *         description: Successfully canceled auction
 *       500:
 *         description: Failed to cancel auction
 * /api/auctions/promote-auction:
 *   post:
 *     summary: Promote auction
 *     responses:
 *       200:
 *         description: Successfully promoted auction
 *       500:
 *         description: Failed to promote auction
 */
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
