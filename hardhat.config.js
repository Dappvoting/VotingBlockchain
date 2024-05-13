require('@nomiclabs/hardhat-ethers');
require('dotenv').config();
require("@nomicfoundation/hardhat-verify");
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.24",  // Set this to the version used in your contracts or a range that includes it
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: "I5A88I2WXNQTKCUNBTQIDRHMGDK14W8R6R",
    },
  }
}
