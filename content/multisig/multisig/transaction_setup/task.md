## Transaction Struct

Since this is a multi-signature wallet, it requires the confirmation of several addresses to execute a transaction. We'll be the parameters for the transaction up-front so that the owners can sign off on it. We'll want to store these parameters in a struct so we can refer back when we execute the transaction.

Define a `Transaction` struct that includes these member variables in **the following order**: 

1. A `address` for the destination of the transaction's value.
2. A `uint256` value of the transaction in wei. 
3. A `bool` which indicates if the transaction has been executed.

## Transactions

We will also want to track the amount of transactions within the wallet and use the count to index our transactions in a lookup.

1. Define a `uint256 transactionCount`.
2. Define a public `transactions` mapping which maps a transaction ID to a `Transaction` struct.

## Confirmations

Since each transaction is only executed once all confirmations are received, we need to implement a way to check which `owners` have confirmed a transaction.

Define a nested `confirmations` mapping which maps a `transactionId` to a mapping of an owner `address` to a `bool` (whether or not they confirmed).