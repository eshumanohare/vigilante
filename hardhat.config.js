// Import necessary modules
require("@nomicfoundation/hardhat-toolbox");
// import the sapphire-hardhat module
require("@oasisprotocol/sapphire-hardhat");

// Load environment variables from .env file
require("dotenv").config({ path: __dirname + "/.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // Specify Solidity version for compiling the contracts
  solidity: "0.8.18",
  networks: {
    // Specify the network used for deployment
    sepolia_testnet: {
      // HTTPS endpoint of the Chainstack Sepolia testnet node
      url: process.env.SEPOLIA_ENDPOINT ? process.env.SEPOLIA_ENDPOINT : "",
      // Accounts used for deployment
      accounts:
        // Use the private key defined in the .env file for deployment
        process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    // Specify the Oasis Sapphire testnet network for deployment
    sapphire_testnet: {
      // URL of the Chainstack Oasis Sapphire node used for deployment
      url: process.env.SAPPHIRE_TESTNET_ENDPOINT
        ? process.env.SAPPHIRE_TESTNET_ENDPOINT
        : "",
      // Accounts used for deployment
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // Chain ID of the Sapphire Testnet
      chainId: 0x5aff,
    },
  },
};
