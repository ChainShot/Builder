## Odd Leaves

Great! Now we can build large merkle trees. But, can we build them with an odd number of leaves?

### Three Leaf Tree

Now let's consider what happens in the case of an odd number of leaves in a tree. Any time that there is no right side of the particular branch, we're just going to want to carry the hash one layer up:

```
    Root
    / \ 
   AB  C
  / \  |
  A B  C
```

In this case we don't use the `C` hash until we hash it together with `AB` to create the Merkle Root. Let's handle this in our test cases. 

Check out configurations for [Other Odd Trees](?tab=details&scroll=Other%20Odd%20Trees).