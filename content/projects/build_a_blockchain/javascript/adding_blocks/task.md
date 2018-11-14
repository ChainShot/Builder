## Add Block

Let's create an `addBlock` function on our `Blockchain` class. 

This function should take in a new block and add it to the `chain` array. 

Each new block should store a reference to the previous block on the chain. Let's add a property `previousHash` to each block, which stores the hash of the block before it. 

[Consider why](?tab=details) each block stores a `previousHash`.