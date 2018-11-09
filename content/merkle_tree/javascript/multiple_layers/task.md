## Multiple Layers

Awesome! Now it's time to create a larger Merkle Tree.

### Four Leaf Tree

Now we need to make sure to handle a case where there are multiple layers of hashing. First we hash together `A` and `B`, then we hash together `C` and `D`. Then we hash together the combination of `A` and `B` (`AB`) with the combination of `C` and `D` (`CD`). Something like this:

```
    Root
    /  \ 
   AB  CD
  / \  / \
  A B  C D
```

To do this is may be useful to think of the tree as having multiple layers, where the first layer is the leaves (`A`, `B`, `C`, `D`) the second is the combination of both of those branches (`AB`, `CD`) and then we reach our Merkle Root or the combination of all branches (`ABCD`). 

It may be helpful to remember [what we're trying to accomplish](?tab=details&scroll=The%20Goal) by hashing at multiple layers. 

This is a tough algorithm to work through. If you need help getting started check out our [Recommended Approach](?tab=details&scroll=Recommended%20Approach).