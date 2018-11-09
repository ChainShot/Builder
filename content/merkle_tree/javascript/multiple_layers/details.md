## The Goal 

**What's the goal of writing a tree structure of hash combinations?**

Consider the four leaf example:

```
    Root
    /  \ 
   AB  CD
  / \  / \
  A B  C D
```

Because `CD` is a combination of `C` and `D` and the `Root` is a combination of `AB` and `CD`, we can see that the hash `C` will directly affect the resulting hash in the `Root`. From `C`'s perspective all we need to know is `D` and `AB` to create the `Root`:

```
Hash(AB, Hash(C, D)) == Root
```

Notice that, in this equation, we can completely forget about `A` and `B`. We don't need to know what they are to prove that `C` is in the `Root`. We just need the hashes `D` and `AB`.  

This optimization is the power of Merkle Trees and it becomes even more apparent with larger trees where less data is necessary to prove that a leaf node is part of the tree. 

## Recommended Approach

There's a few ways to attempt writing this algorithm. The most elegant solutions are likely recursive. This doesn't necessarily mean that you can't attempt it iteratively! Either way, let's break down the thought process on how to approach this.

We have a merkle tree with some arbitrary number of leaf nodes. Maybe it's the four leaf tree: 

```
    Root
    /  \ 
   AB  CD
  / \  / \
  A B  C D
```

Maybe it's the eight leaf tree: 

```
        Root
       /    \
    ABCD     EFGH
    / \      / \
   AB  CD   EF  GH
  / \  / \  / \ / \
  A B  C D  E F G H
```

Our recommended approach to this problem, is to break it down into layers. For each layer, we want to go through every 2 nodes and concatenate them. 

So, if we're on the bottom layer, we want to take `A` and `B` and concatenate them to make `AB`, `C` and `D` to make `CD` and so on until we have four nodes `AB`, `CD`, `EF`, `GH`. 

Once we've done that, we'll move up to the next layer and do the same. Concatenate `AB` and `CD` to get `ABCD`. Concatenate `EF` and `GH` to make `EFGH`. 

We'll repeat this one more time, for the last layer to get our merkle root `ABCDEFGH`. 

We could preemptively calculate how many layers we need to reduce, or we could keep an array of nodes and when it's `length` is one we know we've reached the merkle root. 

It's up to you how to solve it. Make sure you consider the algorithm for each layer as well as your exit condition carefully!