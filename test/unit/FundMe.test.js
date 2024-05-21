const { deployments, getNamedAccounts, ethers } = require("hardhat")

describe("FundMe", function(){
    beforeEach()
    describe("constructor", async function(){  // before testing constructor we should deploy the contract by calling the deployment scripts inside deploy folder
                                               // to do that we need the deployments object from hardhat
        await deployments.fixture(["all"]);    // to wait for all deployments with 'all' tag to deploy
        const {deployer} = await getNamedAccounts(); //gets a list of accounts in networkConfig(accounts) inside hardhat.config.js
        fundMe = await ethers.getContract("FundMe", deployer); // whenever we call a function from fundme, it will be connected with deployer
    })
    it()
    it()
})