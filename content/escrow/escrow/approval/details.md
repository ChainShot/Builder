## Approval Function

Now that our contract is created and funded, the next step in the escrow process is for the arbiter to approve the transfer of funds from the contract address to the beneficiary address.

## Transfer Balance

Let's implement the balance transfer to the beneficiary. This can be accomplished through the use of two globally available functions, ```transfer``` and ```balance```. The syntax for both are as follows:

```
address.balance;
address.transfer(uint256 amount);
```
> ***address.balance*** will return an integer of type uint256 in units of Wei. Make sure to convert from Wei to Ether if needed (not required for this contract)

We can use the keyword ```this``` to refer to the contract instance, or in this case the contract address.

>  Interacting with `this` is similar to interacting with any `address`. The same properties and methods are available (i.e. `balance`, `transfer`).
