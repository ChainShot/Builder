## Another Example

Let's prove A belongs in the ABCDEFGHIJ Merkle Tree
```
                Root
              /      \
      ABCDEFGH        IJ
      /      \         |
    ABCD     EFGH     IJ
    / \      /   \     |
   AB  CD   EF   GH   IJ
  / \  / \  / \  / \  / \      
  A B  C D  E F  G H  I J
```

In order to prove A is in this tree we'll need the following proof path:

```
Hash(Hash(Hash(Hash(A + B) + CD) + EFGH) + IJ)
```

So we'll need four hashes: `B`, `CD`, `EFGH`, and `IJ`.

```
[
 { data: 'B', left: false },
 { data: 'CD', left: false },
 { data: 'EFGH', left: false }
 { data: 'IJ', left: false }
]
```

Such a big tree and we only need four hashes to prove `A`! For `I` or `J` the savings would be even better in this tree, only two hashes necessary for their proofs. Very cool!

## Recommended Approach

This is a difficult algorithm to come up with, so we've included a recommended approach. 

You'll want to approach this similar to how you did the `getRoot` algorithm. If you think of the algorithm in terms of layers, we can figure out what need to do on each layer.

Let's use the ABCDE Merkle Tree for an example:

```
      Root
     /   \
   ABCD   E
   / \    |
  AB  CD  E
 / \  / \ |
 A B  C D E
```

Let's say we want to prove C exists in the tree. We're given the index 2, which corresponds to the C's position in the array passed into our Merkle Tree constructor. 

So we start at `C` on the bottom layer. What do we need to first? 

We need to know if `C` is the left or right node in its pairing. We can determine this by checking `C`'s index (2). Two is even so it is a left node. Now that we know that, we need to add one to our index to get the right node: `D`. We add `D` to our proof and say it is `left: false` (because it's on the right).

Our proof so far: `[{ data: 'D', left: false }]`

Next we need to move up a layer. Since we started at `C` and we have `D` in our proof, we have what we need to make hash `CD`. That means we want to go from our current index 2, to index 1. Since our merkle tree is a binary tree, each layer concatenates its pairs to result in half the number of leaf nodes (with the exception of the odd node). This means we can divide our current index by 2 and take the floor of it. (`Math.floor(2/2)` which is 1). 

So now we move to index 1 on the second layer, which is `CD`. We need to again check if `CD` is a left or right node. Since it's an odd number, it's a right node. We'll subtract one to get it's left node `AB` and add it to our proof:

Our proof so far: `[{ data: 'D', left: false }, { data: 'AB', left: true }]`

If we repeat this pattern, we'll divide our index (1) by 2, take the floor (0) and be at `ABCD`. We'll grab the right node `E` and add that to our proof:

```
[
 { data: 'D', left: false },
 { data: 'AB', left: true },
 { data: 'E', left: false }
]
```

And we're done! 