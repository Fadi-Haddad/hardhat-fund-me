const { deployments, getNamedAccounts, ethers } = require("hardhat")
const { assert } = require("chai")

describe("FundMe", function(){
    let MockV3Aggregator
    let fundMe
    beforeEach(async function(){                // before testing constructor we should deploy the contract by calling the deployment scripts inside deploy folder
                                               // to do that we need the deployments object from hardhat

        await deployments.fixture(["all"]);    // to wait for all deployments with 'all' tag to deploy

        deployer = (await getNamedAccounts()).deployer; //gets a list of accounts in networkConfig(accounts) inside hardhat.config.js

        const fundMeContract = await deployments.get("FundMe");

        // fundMe = await ethers.getContract("FundMe", deployer); // whenever we call a function from fundme, it will be connected with deployer
        
        fundMe = await ethers.getContractAt(
            fundMeContract.abi,
            fundMeContract.address
          );
        MockV3AggregatorContract = await deployments.get("MockV3Aggregator");
        MockV3Aggregator= await ethers.getContractAt(
            MockV3Aggregator.abi,
            MockV3Aggregator.address
          );
        });

    describe("constructor", async function() {
        it("sets the aggregator addresses correctly",async function(){
            const response  = await fundMe.priceFeed();
            assert.equal(response, MockV3Aggregator.address)
        })
    })
})
