const ethers = require('ethers');
const auctionService = require('../services/auctionService');
const { predictStartingBid } = require('../services/pricingAI');

exports.createAuction = async (req, res) => {
  try {
    const { nftAddress, tokenId, startingPrice, reservePrice, priceDropInterval, priceDropAmount, auctionDuration, artist } = req.body;
    const predictedStartingPrice = predictStartingBid(artist);
    const auction = await auctionService.createAuction(nftAddress, tokenId, predictedStartingPrice, reservePrice, priceDropInterval, priceDropAmount, auctionDuration, artist);
    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAuctionDetails = async (req, res) => {
  try {
    const auctionId = req.params.id;
    const auction = await auctionService.getAuctionDetails(auctionId);
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentPrice = async (req, res) => {
  try {
    const auctionId = req.params.id;
    const price = await auctionService.getCurrentPrice(auctionId);
    res.status(200).json({ price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buyAuction = async (req, res) => {
  try {
    const auctionId = req.params.id;
    const { buyerAddress } = req.body;
    const receipt = await auctionService.buyAuction(auctionId, buyerAddress);
    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelAuction = async (req, res) => {
  try {
    const auctionId = req.params.id;
    const receipt = await auctionService.cancelAuction(auctionId);
    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
