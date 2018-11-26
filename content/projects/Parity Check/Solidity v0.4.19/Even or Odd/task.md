## Check Function

Within the `Parity` contract, create a function called `check` which takes in a [left-padded](?tab=details&scroll=Left%20Padded%20Bytes32%20Array) `bytes32` array and converts it to an unsigned integer. 

## Emit Events

Once you have the unsigned integer you'll need to check whether it is even or odd. If it is even, [emit an event](https://solidity.readthedocs.io/en/v0.4.19/contracts.html#events) called `Even` with no arguments. Likewise, if it is odd, emit an event called `Odd` with no arguments.