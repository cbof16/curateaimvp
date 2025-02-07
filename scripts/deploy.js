require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const DutchAuction = await ethers.getContractFactory("DutchAuction");

  require("dotenv").config({ path: "backend/.env" });

  console.log("STARTING_PRICE:", process.env.STARTING_PRICE);
  console.log("RESERVE_PRICE:", process.env.RESERVE_PRICE);
  console.log("PRICE_DROP_INTERVAL:", process.env.PRICE_DROP_INTERVAL);
  console.log("PRICE_DROP_AMOUNT:", process.env.PRICE_DROP_AMOUNT);
  console.log("AUCTION_DURATION:", process.env.AUCTION_DURATION);
  console.log("ARTIST_ADDRESS:", process.env.ARTIST_ADDRESS);

  const dutchAuction = await DutchAuction.deploy(
    process.env.NFT_CONTRACT_ADDRESS,
    process.env.TOKEN_ID,
    ethers.utils.parseEther(process.env.STARTING_PRICE),
    ethers.utils.parseEther(process.env.RESERVE_PRICE),
    process.env.PRICE_DROP_INTERVAL,
    ethers.utils.parseEther(process.env.PRICE_DROP_AMOUNT),
    process.env.AUCTION_DURATION,
    process.env.ARTIST_ADDRESS
  );

  await dutchAuction.deployed();
  console.log("DutchAuction contract deployed to:", dutchAuction.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
