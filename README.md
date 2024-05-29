# hardhat-fund-me

### Commands

1. initiate a hardhat new project:
    ```sh
    yarn add --dev hardhat
    ```
2. configure hardhat project (choose base configs):
    ```sh
    yarn hardhat
    ```
then choose "Create a JavaScript project", change solidity version in hardhat.config.js to 0.8.7

3. compile the contracts:
    ```sh
    yarn hardhat compile
    ```
if compiling command returns an error "The library @chainlink/contracts is not installed", go to 4

4. install chainlink/contracts
    ```sh
    yarn add --dev @chainlink/contracts
    ```
5. install hardhat-deploy package
    ```sh
    yarn add --dev hardhat-deploy
    ```
    continue to 6
   
7. install hardhat-deploy-ethers package to override hardhat-ethers for contract deployment
    ```sh
    yarn add --dev @nomiclabs/hardhat-ethers hardhat-deploy-ethers ethers
    ```
    hardhat-deploy runs the scripts inside the deploy folder by order
   
9. deploy a specific contract using 'tag' like 'mock' for mock contract or 'all' for all contrtacts
    ```sh
    yarn hardhat deploy --tags mock
    ```
10. clean artifacts and cache folders:
    ```sh
    yarn hardhat clean
    ```
11. run all uint tests
    ```sh
    yarn hardhat test
    ```
12. run a certain unit test that includes a certian keyword
    ```sh
    yarn hardhat test --grep "keyword"
    ```    
