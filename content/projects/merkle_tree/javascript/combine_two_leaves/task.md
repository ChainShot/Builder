## Combine Two Leaves

Alright, let's build us a Merkle Tree! 

The goal here is to take a bunch of "leaves" (the data hashes that make up the bottom layer of the tree) and hash them together two at a time to form a tree-like structure.

### Add a Constructor

First things first, write a [constructor](?tab=details&scroll=Constructor) for our MerkleTree class. This constructor will take two arguments:

1. An array of leaf nodes for the Merkle Tree.
2. A `concat` function which can be used to concatenate two hashes together to form a new hash. 

Store both of these arguments on the Merkle Tree instance. 

### Let's get to the Root

Now we need to add a function `getRoot` to our class that allows us to find the merkle root. 

For this stage the only test case setup is taking two roots and hashing them together. Our tree will look like this:

```
    Root
    /  \ 
   A    B
```
Where `A` and `B` are our leaf hashes and the root is the combined hash.

We'll simply need to take our two leaf hashes and combine them using the `concat` function passed into the MerkleTree constructor. This function expects two arguments, the left and right leaf node. You can find more information on the `concat` function [in Details](?tab=details&scroll=Concat%20Function).

On the next stage we'll move onto some more in-depth scenarios.
