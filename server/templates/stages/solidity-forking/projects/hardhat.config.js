require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.7.5",
    settings: {
      optimizer: {
        enabled: false,
        runs: 0
      }
    }
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://hardhat-cache-relayer.herokuapp.com/",
        blockNumber: 11395144
      }
    }
  },
  mocha: {
    reporter: require("@codewars/mocha-reporter"),
  }
};
