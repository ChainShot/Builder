## Block Timestamp

On the Ethereum blockchain each block will have it's own timestamp. Timestamps will be available to us in [Unix Time](https://en.wikipedia.org/wiki/Unix_time), or seconds since the unix epoch: January 1st, 1970.

Specifically in our Solidity Contract we can use `block.timestamp` to look up the number of seconds since the epoch. For this challenge we'll be using [`eth_call`](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_call) to test the function so the `block.timestamp` will be the most recently mined block.

**Real-World Security Considerations**

For mainnet smart contracts we should be careful about how we use timestamps. For instance, they shouldn't be used for randomness because block miners can manipulate the timestamp within a certain threshold (they cannot be in the future or prior to the parent block). 

For the purposes of this challenge we don't need to be concerned with these security considerations.