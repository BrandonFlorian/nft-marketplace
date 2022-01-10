require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: process.env.MUMBAINETWORK,
      accounts: [privateKey]
    },
    mainnet: {
      url: "",
      accounts: []
    }
  },
  solidity: "0.8.4",
};
