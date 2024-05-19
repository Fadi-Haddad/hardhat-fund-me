const { network } = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

async function deployFundMe({ deployments, getNamedAccounts }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  
    const fundMe = await deploy("FundMe", {
      from: deployer,
      args: [ethUsdPriceFeedAddress],
      log: true
    });
  }
  
  module.exports = deployFundMe;

