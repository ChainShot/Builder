## Securely Storing Data

In this stage we use `data` to represent some arbitrary data that can be stored in a block. We hash the `data` to create a fixed size representation of that data. If the hash for a block ever changed, we would know that the data changed. For real blockchains, the `data` is more likely to be a series of transactions stored in a merkle tree. We'll get to that in a future challenge.

We can add other properties to the hash like `timestamp`, the time at which the block was mined, to make an even more useful immutable record of the block. In this way, if two people had copies of a block, it would be pretty easy to tell if one version is different from the other without having to look at all of its properties.

We'll make this hash an even more powerful record in future steps when blocks are linked in the blockchain and we can add in the hash of the previous block to our current hash! 