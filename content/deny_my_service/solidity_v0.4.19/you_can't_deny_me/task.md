In `Investment.sol` you'll see we have a smart contract that allows users to invest into a smart contract for a later distribution of tokens. 

As it currently stands there are two Denial of Service (DoS) vulnerabilities within this smart contract, specifically in the `distribute` function:

- [Externally Manipulated Arrays](?tab=details&scroll=Externally%20Manipulated%20Arrays)
- [Owners Operations](?tab=details&scroll=Owners%20Operations)

## How do we fix these vunerabilities?

1) First, we'll pass in an `unlockTime` variable into our constructor which will allow investors to approve the distribution after a certain time period if the owner is unable to do so. This will be an integer number of days until the distribution can be approved.

2) Write an `approveWithdraw` function which will unlock the distribution and allow investors to `withdraw`. This function should only be called by the owner of the contract or is callable by any address after an `unlockTime` is reached. 

3) Finally, write a `withdraw` function which allows an investor to convert their investment into tokens. This will need to be approved in the `approveWithdraw` function before withdrawals can be processed.

The `withdraw` and `approveWithdraw` functions will replace the vulnerable `distribute` function. 

> Hint: `block.timestamp` will return the timestamp of the current block in seconds since the epoch.

> Hint: Re-factoring the existing code is a major part of this challenge.