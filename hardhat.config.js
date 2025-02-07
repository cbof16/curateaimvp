require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.1",
      },
    ],
  },
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: ["5f3a67dd8a5afbf29f1e64b18375fa696428eb959130b7bb76751ef9e2d1c01c"] // Replace with your private key
    }
  }
};
