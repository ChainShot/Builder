## Other Odd Trees

The rule for odd trees is always to use up everything towards the left side before filling out the right side of the tree. 
 
### Five Leaf Tree

With five leaves, we use the first four as the left side and bring the fifth hash all the way up until the last combination. 

```
      Root
     /    \
    ABCD   E
    / \    |
   AB  CD  E
  / \  / \ |
  A B  C D E
```

### Seven Leaf Tree

With seven leaves, the last three hashes work similar to a three leaf tree to build up the `EFG`  combination and then combines with the first four hashes.

```
        Root
       /    \
    ABCD     EFG
    / \      / \
   AB  CD   EF  G
  / \  / \  / \ |
  A B  C D  E F G
```