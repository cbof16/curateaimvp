const { createAuction, getAuctionDetails, getCurrentPrice, buyAuction, cancelAuction } = require('./auctionService');
const ethers = require('ethers');

async function simulateAuction() {
  try {
    // Parameters for creating an auction
    const nftAddress = '0x1D561c9655501235FA5e13E53Efd8535Bce06388'; // Deployed NFT contract address
    const tokenId = 1;
    const startingPrice = ethers.utils.parseEther('1.0');
    const reservePrice = ethers.utils.parseEther('0.5');
    const priceDropInterval = 60; // in seconds
    const priceDropAmount = ethers.utils.parseEther('0.1');
    const auctionDuration = 3600; // in seconds
    const artist = '0xFeA68598eEAd1Ae974A0Da5bcFAc197e9c165fE1'; // Actual artist address

    // Define the signer
    const provider = new ethers.providers.JsonRpcProvider('https://avalanche-fuji.infura.io/v3/08781009249246db92c9c8c4eed2fe17');
    const signer = new ethers.Wallet('5f3a67dd8a5afbf29f1e64b18375fa696428eb959130b7bb76751ef9e2d1c01c', provider);

    // Define the NFT contract
    const nftContract = new ethers.Contract(nftAddress, [
      'function approve(address to, uint256 tokenId) public',
      'function ownerOf(uint256 tokenId) public view returns (address)',
      'function mint(address to) public returns (uint256)'
    ], signer);

    // Ensure the seller owns the token
    const owner = await nftContract.ownerOf(tokenId);
    console.log("Owner of the NFT:", owner);
    
    if (owner !== artist) {
      throw new Error('Seller does not own the NFT');
    }
    
    // Create auction
    const auctionContract = await createAuction(nftAddress, tokenId, startingPrice, reservePrice, priceDropInterval, priceDropAmount, auctionDuration, artist);
    console.log('Auction created:', auctionContract.address);

    // Approve the auction contract to transfer the NFT
    await nftContract.approve(auctionContract.address, tokenId);

    // Get auction details
    const details = await getAuctionDetails(auctionContract.address);
    console.log('Auction details:', details);

    // Get current price
    const currentPrice = await getCurrentPrice(auctionContract.address);
    console.log('Current price:', currentPrice);

    // Verify auction status before buying
    const auctionDetails = await getAuctionDetails(auctionContract.address);
    if (auctionDetails.auctionEnded) {
      throw new Error('Auction already ended');
    }

    // Simulate buying the auction with a different signer
    const buyerPrivateKey = 'd6861a053dd8271cb1f291845c836a55f3c961236ef32b5b8d83f73205c7b418'; // Replace with actual private key
    const buyerWallet = new ethers.Wallet(buyerPrivateKey, provider);
    const buyerSigner = buyerWallet.connect(provider);
    const buyerAddress = '0xFeA68598eEAd1Ae974A0Da5bcFAc197e9c165fE1';
    try {
      const receipt = await buyAuction(auctionContract.address, buyerSigner.address, { value: currentPrice, gasLimit: 3000000 });
      console.log('Auction bought:', receipt);
    } catch (error) {
      console.error('Error buying auction:', error);
    }

    // Cancel auction (if needed)
    // const cancelReceipt = await cancelAuction(auctionContract.address);
    // console.log('Auction cancelled:', cancelReceipt);
  } catch (error) {
    console.error('Error simulating auction:', error);
  }
}

simulateAuction();
