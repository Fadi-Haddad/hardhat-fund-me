const { network } = require("hardhat");
const {verify} = require ("../utils/verify")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()
let ethUsdPriceFeedAddress
async function deployFundMe({ deployments, getNamedAccounts }) {
    
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
      } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }


    const fundMe = await deploy("FundMe", {
      from: deployer,
      args: [ethUsdPriceFeedAddress],
      log: true,
      waitConfirmations: network.config.waitConfirmations || 1,
    });
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        await verify(fundMe.address, [ethUsdPriceFeedAddress || fallBackAddress])
    }
  }
  
  module.exports = deployFundMe;
  module.exports.tags = ["all","sepolia"];

