> **Note:** *The remainder of this block will be using JavaScript.*

## Deploy your Contract!

Using the web3 JavaScript library, we're going to deploy our contract. Let's write a function ```deploy``` that will do exactly that!

1) Create a new [web3 contract instance](?tab=details&scroll=Web3%20Instance).

2) Estimate the amount of gas it will cost to deploy the contract given the its arguments (`arbiterAddress` and `beneficiaryAddress`) and its `bytecode`.

3) Use the gas estimate to deploy the contract  and `send` it from the `depositorAddress`.