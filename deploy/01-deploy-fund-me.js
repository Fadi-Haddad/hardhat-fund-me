const { network } = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

async function deployFundMe({ deployments, getNamedAccounts }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"] ;

    const fallBackAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

    const fundMe = await deploy("FundMe", {
      from: deployer,
      args: [ethUsdPriceFeedAddress || fallBackAddress],
      log: true
    });
  }
  
  module.exports = deployFundMe;
  module.exports.tags = ["all","sepolia"];

