async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
  const simpleNFT = await SimpleNFT.deploy();
  await simpleNFT.deployed();

  console.log("SimpleNFT deployed to:", simpleNFT.address);

  // Mint a token to the deployer's address
  const tokenId = 1;
  await simpleNFT.mint(deployer.address, tokenId);
  console.log(`Minted token ID ${tokenId} to address ${deployer.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
