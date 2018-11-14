## The UTXO Model

Let's create a special token that uses a [UTXO Model](?tab=details&scroll=UTXO%20Model) for tracking token balances. 

### Admin Initialize Function

For simplicity let's create an admin function for initializing the UTXOs. Name the function `initialize`. It will take two parameters:

- An `address` for the owner of the UTXO
- A `uint256` value for how many tokens the UTXO should contain

This function should only be callable by the admin, that is whoever deployed the token contract. Otherwise the transaction should revert.

### Spending Function

Create a function called `spend` that will allow owners to spend their UTXOs. It will take three parameters:

- A `bytes32` id that uniquely identifies the UTXO to spend
- A `uint256` amount for how much of the UTXO to spend
- An `address` for who to send the amount to

The transaction will always create a new UTXO for the address that the amount is being sent to. If the spending amount is less than the total amount contained in the UTXO, we should send the remaining balance back to the original owner as a new UTXO. 

If someone tries to spend a UTXO they do not own or spend more than their UTXO contains the transaction should revert.

### New UTXO Event

Both the `initialize` and `spend` functions should create new UTXOs. Whenever this happens, emit the event `NewUTXO` which should have three parameters:

- An `address` for the owner of the UTXO
- A `bytes32` **unique** id to refer to the UTXO
- An `uint256` for the value of the UTXO

> Note that the `spend` function can potentially call the `NewUTXO` event *twice*! 