const { network } = require("hardhat");
const { networkConfig, developmentChains, DECIMAL, INITIAL_ANSWER} = require("../helper-hardhat-config");
require("dotenv").config();

async function deployFundMe({ deployments, getNamedAccounts }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  if (developmentChains.includes(chainId.name)) {
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      log: true,
      from: deployer,
      args: [DECIMAL, INITIAL_ANSWER], // required params obtained from MockV3Aggregator constructor function
    });
    console.log("Mocks Deployed");
    console.log("------------------------------");
  }
}

module.exports = deployFundMe;

module.exports.tags = ["all","mocks"];
