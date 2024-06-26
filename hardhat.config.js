// require("@nomicfoundation/hardhat-toolbox");
// require('hardhat-deploy');
// require("@nomicfoundation/hardhat-verify");
// require("@nomiclabs/hardhat-ethers")
// require("dotenv").config()

// /** @type import('hardhat/config').HardhatUserConfig */

// const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
// const PRIVATE_KEY = process.env.PRIVATE_KEY
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

// module.exports = {
//   defaultNetwork: "hardhat",
//   solidity: "0.8.8",
//   etherscan: {
//     apiKey: {
//       sepolia: ETHERSCAN_API_KEY || '1DRVTRDFHJ3Q5WZDJKT4NZN8RET1NFZFBK'
//     }
//   },
//   networks: {
//     hardhat: {
//         chainId: 31337,
//     },
//     sepolia: {
//         url: SEPOLIA_RPC_URL,
//         accounts: [PRIVATE_KEY],
//         chainId: 11155111,
//         waitConfirmations: 6
//     },
// },
//   namedAccounts: {
//     deployer: {
//         default: 0, // here this will by default take the first account as deployer
//         1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
//     },
// },

// };
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/F-zyN1ITwv9KYxjuSdeRgrsVjAXej9xN"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "0x932c1bc3b1299d5bf4263cc8c94800d082f7fafd14fe2da650dd878cd30424d7"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.6.6",
            },
        ],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
    mocha: {
        timeout: 500000,
    },
}