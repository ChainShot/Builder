## Chain Validation

Since this blockchain is going to be used on a peer to peer network, we'll want to be able to run a function that will determine whether or not the blockchain is valid. Let's create that function `isValid` on the Blockchain class.

This function should be checking the integrity on all blocks in the chain. Each block's `hash` should be a valid hash of it's `previousHash` and `data`. Each block's `previousHash` should point to the current valid hash of the previous block.

> *Hint*: You can use `console.log` to log messages to the output. 

> *Hint*: If your `hash` is the return value of the `SHA256` function it's an array of bytes and you will need to turn it into a string (`.toString`) to compare it.