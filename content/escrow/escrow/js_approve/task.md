## Approve Function

Now we're going to write the JavaScript function to interact with the `approve` function we wrote on the contract which allows the arbiter to move the funds.

1. Use the Escrow Address passed to the `approve` function to instantiate the Escrow Contract at that address
2. Call the Escrow Contract approve function to transfer the funds to the beneficiary
