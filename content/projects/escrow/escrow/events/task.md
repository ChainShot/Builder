## Approval Event

When a transaction occurs through a smart contract, that transaction is written to the blockchain. 

Events in Solidity help to **log additional information** about a transaction and can additionally be a useful way for JavaScript developers to subscribe to particular events they care about from your contract. 

1. Let's create an `Approved` event that takes in a `uint` representing the balance prior to the approval.
2. Invoke the Approved event within the approve function, passing in the balance. 