require("@nomiclabs/hardhat-waffle");
dotenv=require('dotenv').config();

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
      accounts: [process.env.PRIVATE_KEY] // Replace with your private key
    }
  }
};
