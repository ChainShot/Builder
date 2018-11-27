## Constructor

We will now build a JavaScript Approve function for your application in order to approve the escrow on the blockchain.

## Approve

Create an approve function that takes in the `escrowContractAddress` and an `arbiterAddress` and returns the call to the smart contracts approve function. 

You'll need to assign the `escrowContractAddress` to the web3 contract you created. The web3 address can be assigned using the following syntax:

```
web3ContractInstance.options.address = 0xec...
```

Finally, return the promise to the contract approve function from within your JavaScript function. 

This is accomplished by accessing the property `methods` on the contract instance. This will give us access to all methods contained within the contract. 

Invoke the `approve` function within `methods` then `send` it from the `arbiterAddress` (the only address who can approve).

```
return EscrowContract.methods['methodName']().send({
   from: 0xec...
})
```
