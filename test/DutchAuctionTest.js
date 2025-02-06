const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DutchAuction", function () {
  let DutchAuction, dutchAuction, owner, addr1, addr2;

  beforeEach(async function () {
    DutchAuction = await ethers.getContractFactory("DutchAuction");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    const nftAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual NFT contract address
    const tokenId = 1;
    const startingPrice = ethers.utils.parseEther("1");
    const reservePrice = ethers.utils.parseEther("0.1");
    const priceDropInterval = 60; // 1 minute
    const priceDropAmount = ethers.utils.parseEther("0.01");
    const auctionDuration = 3600; // 1 hour
    const artistAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual artist address

    dutchAuction = await DutchAuction.deploy(
      nftAddress,
      tokenId,
      startingPrice,
      reservePrice,
      priceDropInterval,
      priceDropAmount,
      auctionDuration,
      artistAddress
    );
    await dutchAuction.deployed();
  });

  it("Should deploy the contract", async function () {
    expect(dutchAuction.address).to.properAddress;
  });

  it("Should return the correct current price", async function () {
    const initialPrice = await dutchAuction.getCurrentPrice();
    expect(initialPrice).to.equal(ethers.utils.parseEther("1"));

    // Fast forward time by 10 minutes
    await ethers.provider.send("evm_increaseTime", [600]);
    await ethers.provider.send("evm_mine");

    const priceAfter10Minutes = await dutchAuction.getCurrentPrice();
    expect(priceAfter10Minutes).to.equal(ethers.utils.parseEther("0.9"));

    // Fast forward time to the end of the auction
    await ethers.provider.send("evm_increaseTime", [3600]);
    await ethers.provider.send("evm_mine");

    const finalPrice = await dutchAuction.getCurrentPrice();
    expect(finalPrice).to.equal(ethers.utils.parseEther("0.1"));
  });

  it("Should allow a user to buy the NFT at the current price", async function () {
    // Fast forward time by 10 minutes
    await ethers.provider.send("evm_increaseTime", [600]);
    await ethers.provider.send("evm_mine");

    const priceAfter10Minutes = await dutchAuction.getCurrentPrice();
    await dutchAuction.connect(addr1).buy({ value: priceAfter10Minutes });

    const auctionEnded = await dutchAuction.auctionEnded();
    expect(auctionEnded).to.be.true;

    // Check balances
    const artistBalance = await ethers.provider.getBalance("0x0000000000000000000000000000000000000000"); // Replace with actual artist address
    const sellerBalance = await ethers.provider.getBalance(owner.address);

    expect(artistBalance).to.equal(priceAfter10Minutes.mul(10).div(100));
    expect(sellerBalance).to.equal(priceAfter10Minutes.mul(90).div(100));
  });

  it("Should allow the seller to cancel the auction", async function () {
    await dutchAuction.connect(owner).cancelAuction();

    const auctionEnded = await dutchAuction.auctionEnded();
    expect(auctionEnded).to.be.true;
  });

  // Add more tests here
});
