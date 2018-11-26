
## Add Transaction Function

Let's add some transactions to our wallet!

Define an `addTransaction` public function with a destination `address` and `uint256` value as parameters. 

This function should create a new transaction struct and return it's `uint256` id. 

You can determine the id by the total number of transactions at the time the transaction is created. For example, if there are 3 transactions, the next transaction id is 3.

## Safety Check  

Revert the `addTransaction` function if the destination `address` is the zero-account (`address(0)` in solidity). 