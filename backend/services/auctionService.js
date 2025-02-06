require('dotenv').config();
const ethers = require('ethers');
const { abi, bytecode } = require('../../artifacts/contracts/DutchAuction.sol/DutchAuction.json');

const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
console.log('PRIVATE_KEY:', process.env.PRIVATE_KEY);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

exports.createAuction = async (nftAddress, tokenId, startingPrice, reservePrice, priceDropInterval, priceDropAmount, auctionDuration, artist) => {
  const auctionFactory = new ethers.ContractFactory(abi, bytecode, wallet);
  const auction = await auctionFactory.deploy(nftAddress, tokenId, startingPrice, reservePrice, priceDropInterval, priceDropAmount, auctionDuration, artist);
  await auction.deployed();
  return auction;
};

exports.getAuctionDetails = async (auctionId) => {
  const auction = new ethers.Contract(auctionId, abi, provider);
  const details = await auction.getAuctionDetails();
  return details;
};

exports.getCurrentPrice = async (auctionId) => {
  const auction = new ethers.Contract(auctionId, abi, provider);
  const price = await auction.getCurrentPrice();
  return price;
};

exports.buyAuction = async (auctionId, buyerAddress) => {
  const auction = new ethers.Contract(auctionId, abi, wallet);
  const tx = await auction.buy({ from: buyerAddress, value: ethers.utils.parseEther('1.0') });
  const receipt = await tx.wait();
  return receipt;
};

exports.cancelAuction = async (auctionId) => {
  const auction = new ethers.Contract(auctionId, abi, wallet);
  const tx = await auction.cancel();
  const receipt = await tx.wait();
  return receipt;
};
