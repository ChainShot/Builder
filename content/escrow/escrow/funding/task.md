## Funding The Escrow

Now we're going to make sure the depositor can properly fund the escrow contract. To do so, our constructor is going to need to be able to accept ether from person deploying the contract.

1. Add a [Payable Keyword](?tab=details&scroll=Payable%20Modifier) to our constructor

> This stage is pretty straightforward but it's important to check out the details to understand what the `payable` keyword does once you've placed successfully added it.
