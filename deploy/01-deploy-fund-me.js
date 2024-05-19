const { network } = require("hardhat");

async function deployFunc({ deployments, getNamedAccounts }) {    // { deployments, getNamedAccounts } destructures hre object
  const { deploy, log } = deployments;
  const { deployer } = getNamedAccounts()
  const chainId = network.config.chainId
}
module.exports.default = deployFunc;
