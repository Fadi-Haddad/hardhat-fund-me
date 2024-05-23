const { deployments, getNamedAccounts, ethers } = require("hardhat")
const { assert } = require("chai")

describe("FundMe", function(){
    let MockV3Aggregator
    let fundMe
    let MockV3AggregatorContract
    beforeEach(async function(){                // before testing constructor we should deploy the contract by calling the deployment scripts inside deploy folder
                                               // to do that we need the deployments object from hardhat

        await deployments.fixture(["all"]);    // to wait for all deployments with 'all' tag to deploy

        deployer = (await getNamedAccounts()).deployer; //gets a list of accounts in networkConfig(accounts) inside hardhat.config.js
        console.log(deployer, "deployer")
        const fundMeContract = await deployments.get("FundMe");

        // fundMe = await ethers.getContract("FundMe", deployer); // whenever we call a function from fundme, it will be connected with deployer
        
        fundMe = await ethers.getContractAt(
            fundMeContract.abi,
            fundMeContract.address
          );
        console.log(fundMeContract.address, "fundMeContract.address")

        MockV3AggregatorContract = await deployments.get("MockV3Aggregator");
        MockV3Aggregator= await ethers.getContractAt(
            MockV3AggregatorContract.abi,
            MockV3AggregatorContract.address
          );
          console.log(MockV3AggregatorContract.address, "MockV3AggregatorContract.address")
        });

    describe("constructor", async function() {
        it("sets the aggregator addresses correctly",async function(){
            const response  = await fundMe.getPriceFeed();
            console.log("Actual priceFeed address:", response);
            assert.equal(response, MockV3AggregatorContract.address); // Update this line
        })
    })
})