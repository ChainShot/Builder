## Let's keep the balances 

Now it's time to keep track of each person's balance of the token.
 
To begin with, let's set the balance of the [address](?tab=details&scroll=Addresses) that deploys the contract to have all of the tokens.

### Balances

Let's create a [mapping](?tab=details&scroll=Mapping) called `balances` that will associate or "map" an `address` to a `uint256` balance.

Once you have created the public `balances` mapping you should notice the validation has been checked. 

## Set the Owner's Balance

For our simple token implementation, we’re going to transfer the token supply to the address that deployed the contract.

We can do this using the `msg.sender` global which gives us access to the address of the person running the transaction. 
