## Compile Contract

In order to store a smart contract on the blockchain, the solidity code must be compiled down to bytecode. This is accomplished using the **solc compiler**. However, the configuration required to compile a contract using solc can be quite difficult. Thankfully Truffle can help with the heavy lifting as a development environment, testing framework and asset pipeline for Ethereum.

## Truffle

Using Truffle to compile your smart contracts makes life much easier as a Solidity developer. Once installed on your system, the ```truffle init``` command will create all the necessary folders and configurations files needed to compile your smart contracts. For more information on truffle please visit the [documentation](http://truffleframework.com/docs/).

Within this step, compile your smart contract with truffle to produce the output file **EscrowContract.json**. This JSON file is important because it includes:

- the contract bytecode needed to store the contract on the blockchain
- the Application Binary Interface (ABI) which allows you to call functions in a smart contract and receive data back

Typically interacting with a smart contract requires us to make [RPC calls](https://github.com/ethereum/wiki/wiki/JSON-RPC) to ethereum nodes. The **web3.js** library makes this easy for solidity developers.

**Look over the JSON file** to get familiar with the data structure and contents. In this contract, we will specifically use the bytecode and abi values.

## Web3.js

The web3.js library was built to **enable JavaScript applications** the ability to interact with ethereum nodes and is recommended (almost necessary) when beginning to develop smart contracts.

If using NPM, you can install web3 using ```npm install web3``` on the command line. Once installed, you will have access to web3 functions within your application. For other installation methods and additional documentation, visit the web3.js [GitHub page](https://github.com/ethereum/web3.js).
