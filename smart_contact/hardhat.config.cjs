// https://eth-sepolia.g.alchemy.com/v2/drhoZ-gwVK9_xv3C2x6id6gYfIaT3U5i
// https: require("@nomicfoundation/hardhat-toolbox");

// const { network } = require("hardhat");

// /** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/drhoZ-gwVK9_xv3C2x6id6gYfIaT3U5i",
      accounts: [
        "49c7202a14e4b89ec2dfdd399f5d594e863b9b2735492769aae476be0b5e2f22",
      ],
    },
  },
};
