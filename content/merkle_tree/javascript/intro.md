## Merkle Trees

Merkle Trees are awesome! They allow us to verify one piece of data is part of a large data structure, without having all of its parts. This means they can be used to check for inconsistencies in all kinds of distributed systems!

For Blockchain, storing transactions as Merkle Trees allows us to look at a block and verify that a transaction was part of that block by only having part of the data set (average case `log(n)` where `n` is the number of leaf nodes).

Let's take a look at an example: 


### ABCDEFGHIJ Merkle Tree 

In this tree each letter represents a hash, and combining letters represents concatenating hashes and hashing those together. 

```
          Root 
        /      \
    ABCD        EFGHIJ
     |          /    \
    ABCD     EFGH     IJ
    / \      /   \     |
   AB  CD   EF   GH   IJ
  / \  / \  / \  / \  / \      
  A B  C D  E F  G H  I J
```

To prove that the hash `A` is a part of the Merkle Root we don't need to know Hash `C` or `D`, we just need to know Hash `CD`. The necessary proof for `A` is:

```
Hash(Hash(Hash(A + B) + CD) + EFGHIJ)
```
Where we only need to know the hashes `B`, `CD`, and `EFGHIJ` to prove that `A` is in the merkle root. 

If you don't understand all of this, don't worry! That's what this lesson is for. You will understand soon and we'll come back to this over the coming stages.
 