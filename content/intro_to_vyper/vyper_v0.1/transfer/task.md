## Spread the Token

It's time to spread the token and write out a `transfer` function. This will allow addresses to send tokens to other addresses. 

Now the person who deploys the contract can share tokens with all their friends! 

### Transfer Function

Create a public function called `transfer`. This [function](?tab=details&scroll=Function%20Signature) should take in two arguments:

1. A `uint256` amount of tokens to transfer
2. An `address` for who to transfer to 

The person transferring the tokens is the person calling the function (remember it's `msg.sender`). 

You'll need to [update](?tab=details&scroll=Update%20a%20Mapping) the balances mapping to transfer the tokens from the `msg.sender` to the `address` passed into the `transfer` function signature.

> It may be helpful to declare a [local variable](?tab=details&scroll=Local%20Variables) inside the function. In which case the declaration is similar to how we declared state variables, except inside the function body.