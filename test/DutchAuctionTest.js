const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DutchAuction", function () {
  let DutchAuction, dutchAuction, nft, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("MockERC721");
    nft = await NFT.deploy();
    await nft.deployed();

    DutchAuction = await ethers.getContractFactory("DutchAuction");
    dutchAuction = await DutchAuction.deploy(
      nft.address,
      1,
      ethers.utils.parseEther("10"),
      ethers.utils.parseEther("1"),
      60,
      ethers.utils.parseEther("1"),
      3600,
      owner.address
    );
    await dutchAuction.deployed();

    await nft.mint(owner.address);
    await nft.approve(dutchAuction.address, 1);
  });

  it("Should deploy the contract", async function () {
    expect(await dutchAuction.nft()).to.equal(nft.address);
  });

  it("Should return the correct current price", async function () {
    expect(await dutchAuction.getCurrentPrice()).to.equal(
      ethers.utils.parseEther("10")
    );
  });

  it("Should allow a user to buy the NFT at the current price", async function () {
    await ethers.provider.send("evm_increaseTime", [1800]);
    await ethers.provider.send("evm_mine");

    const currentPrice = await dutchAuction.getCurrentPrice();
    await dutchAuction.connect(addr1).buy({ value: currentPrice });

    expect(await nft.ownerOf(1)).to.equal(addr1.address);
  });

  it("Should allow the seller to cancel the auction", async function () {
    await dutchAuction.connect(owner).cancelAuction();

    expect(await nft.ownerOf(1)).to.equal(owner.address);
  });
});
