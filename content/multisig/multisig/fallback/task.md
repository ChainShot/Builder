## Payable Fallback

Define a fallback `payable` function which will allow our Multi-Sig wallet to accept funds. 

## Confirmed Getter

Define an `isConfirmed` public function with a transaction ID as it's only argument. It should return true if the transaction is confirmed and false if it is not.

We can use the `isConfirmed` function to check whether a specific transaction has met its confirmation requirements.
