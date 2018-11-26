## Externally Manipulated Arrays

The `distribute` function loops through the `validInvestors` array in order to transfer tokens to the respective investors balance. 

Since the `validInvestors` array size can be manipulated outside of the context of the smart contract, if a bad actor wanted to flood the network and deny service they could continually invest small amounts of Ether into the contract causing the distribute method to run longer than expected.

We can prevent this behavior by moving the responsibility of distribution from the `owner` to the individual investor.

## Owners Operations

Notice that the `distribute` function is required to be called by the `owner`. In normal circumstances, this makes sense but what if owner never called the `distribute` function? 

This could happen for many reasons such as the owner lost the owner address credentials associated to the contract or even passed away and was the only person to know the owner address credentials. In any case, the contract investments are now locked up forever denying them from converting their investment to tokens.

We can prevent this behavior by adding an additional option for calling this function such as an `unlockTime`, allowing investors access to their tokens.