## Web3 Instance

Before we move on to writing the deploy function, **create a new web3 contract instance**. This instance should take the abi data as an argument and be assigned to a variable called EscrowContract. The syntax for creating a new web3 instance (JavaScript) is as follows:

```
new web3.eth.Contract(abi);
```

## Deploy Function Overview

You will help complete a `deploy` function that takes an amount in ether and the 3 escrow party addresses as arguments. It will return a promise using the estimated gas of the deployed contract. 

To do this we'll have to find the estimated gas of the contract. This can be accomplished by calling the web3 function ```deploy``` on the contract instance and then invoking the web3 function ```estimateGas``` on the return value of deployed contract. The returned gas value can then be passed into the promise.

The promise will perform two tasks:

- Deploy the contract using the ```deploy``` function (again)
- ```send``` the return value of the deployed contract to the blockchain

## Web3 functions

The ```deploy``` function takes two parameters as an object of key-value pairs:

-  **data:** the compiled contract bytecode
-  **arguments** (*optional*): if the smart contract constructor receives any arguments, they are passed in here

```
contractName.deploy({
  arguments: [address1, address2, …], 
  data: bytecode,
})
```

The ```send``` function will take three parameters as an object of key-value pairs:

- **from:** the address the transaction should be sent from
- **gas:** the maximum gas to use for this transaction (estimated gas)
- **value** (*optional*): send some ether in the transaction (measured in Wei)
