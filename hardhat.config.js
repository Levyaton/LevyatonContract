/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      gas: "auto",
      mining: {
        auto: false,
        interval: 30000 // mine a new block every 30 seconds
      }
    }
  }
};
