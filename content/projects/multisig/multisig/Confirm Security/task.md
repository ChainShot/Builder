## Confirmation Security

Let's create a few assertions to be sure the `confirmTransaction` function is not misused. 

## Valid Owners

First let's ensure that `confirmTransaction` can only be called by the `owners` stored in the constructor. 

If anyone else calls this function, let's revert. 

## Existing Transaction

Next, we'll want to be sure the function is called only on an existing transaction. If the transaction does not exist, we'll revert. 

In order to check for transaction existence, we can check that a valid destination `address` exists within that `struct`. If not it will be set to the zero-account `address(0)`.

## Already Confirmed

Finally, we should revert if an owner is trying to confirm a transaction they already have confirmed. 
