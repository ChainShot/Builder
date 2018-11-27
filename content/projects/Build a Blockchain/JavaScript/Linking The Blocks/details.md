## Why do we need to link blocks? 

Let's say that each block contains a list of transactions instead of our `data` property (for most blockchains this is the case). 

If the first block contains a transaction that says I sent you $10 and this is the only block on our blockchain, then it would be pretty easy to change it. 

However, if that transaction was on the first block of 100 blocks, it would be much more difficult. You would need to change all 100 blocks. The first block's transaction would change, which would change it's hash, which would need to change the hash the block in front of it points to. 

In a future challenge we'll add **difficulty** to this blockchain implementation through a concept called Proof Of Work. By making each block more difficult to create, it becomes exponentially harder to change data that is further entrenched in the blockchain.