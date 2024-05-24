const { deployments, getNamedAccounts, ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("FundMe", function(){
    let MockV3Aggregator
    let fundMe
    let MockV3AggregatorContract
    const sentValue = ethers.utils.parseEther("1");

    beforeEach(async function(){                // before testing constructor we should deploy the contract by calling the deployment

                                               // scripts inside deploy folder to do that we need the deployments object from hardhat

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
            MockV3AggregatorContract.abi,
            MockV3AggregatorContract.address
          );
        });

    describe("constructor", async function() {
        it("sets the aggregator addresses correctly",async function(){
            const response  = await fundMe.getPriceFeed();
            console.log("Actual priceFeed address:", response);
            assert.equal(response, MockV3AggregatorContract.address);
        })
    })
    describe("fund", async function() {
        it("Fails if the amount sent is not enough",async function(){
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!") 
        })
        it("Sends the amout from the sender account and updates the 'addressToAmountFunded' mapping",async function(){
            await fundMe.fund({value : sentValue}); //transaction Object doesn't need the sender address as it has the deployer address as sender
                                                    // any payable function needs two params(sender and amount) 
            const response  =await fundMe.addressToAmountFunded(deployer)
            assert.equal(response.toString(), sentValue.toString())
        })
        it("Adds the sender to the funders array",async function(){
            await fundMe.fund({value : sentValue}); 
            const lastFunder = await fundMe.funders(0)
            assert.equal(lastFunder, deployer)
        })
        
    })
    describe("withdraw", async function() {
        beforeEach(async function (){
            await fundMe.fund({value : sentValue}); // before testing, we should fund the contract with money from deployer
        })
        it("Withdraws money from sent deployer",async function(){ 
            const initialDeployerBalance = await fundMe.provider.getBalance(deployer);
            const initialContractBalance = await fundMe.provider.getBalance(fundMe.address);
            
            const transactionResponse  = await fundMe.withdraw()
            const transactionReceipt   = await transactionResponse.wait(1)

            const {gasUsed, effectiveGasPrice } = transactionReceipt // receipt object has many properties....
            const gasCost = gasUsed*(effectiveGasPrice)

            const finalDeployerBalance = await fundMe.provider.getBalance(deployer);
            const finalContractBalance = await fundMe.provider.getBalance(fundMe.address);

            assert.equal(finalContractBalance.toString(),0 )
            assert.equal(initialContractBalance.add(initialDeployerBalance).toString(),finalDeployerBalance.add(gasCost).toString())
        })
    })
})