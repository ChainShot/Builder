## Build The Proof

Alright, now it's time to build the proof that a particular leaf node exists within a merkle tree! 

With this proof, we'll only want to include the necessary hashes we need to create the root hash from our target leaf node.

## Add the getProof Method

Let's add a `getProof` method to our Merkle Tree, this function will take in an index of a leaf node and give us back a merkle proof, which is the minimum necessary hashes we'll need to prove the leaf node belongs in the tree.

Check out the example below or [follow our Recommended Approach](?tab=details&scroll=Recommended%20Approach).

### ABCDE Merkle Tree Example

```
      Root
     /    \
    ABCD   E
    / \    |
   AB  CD  E
  / \  / \ |
  A B  C D E
```

**Proof of C**

To Prove `C` can build the Merkle Root, we can look at the path we need to take to hash up to the root:

```
Hash(Hash(AB + Hash(C + D)) + E)
```

So the four hashes in use here are `AB`, `C`, `D`, and `E`. Since we're starting with `C`, we don't need that node in the proof. We'll need to know the hashes `AB`, `D` and `E`. 

Also (and this is important!) we need to know the order in which they should be hashed. `Hash(A + B)` will not be the same as `Hash(B + A)`. Our proof should contain the `data` (the hash) and whether or not the node is in the `left` position. 

Our resulting proof would look like this:

```
[
 { data: 'D', left: false },
 { data: 'AB', left: true },
 { data: 'E', left: false }
]
```

By looking at that proof, we can easily concatenate to the root. We start with `C`, concatenate `D` on the right (`CD`), concatenate `AB` to the left (`ABCD`) and then concatenate `E` on the right to get the root `ABCDE`. 

Look at that! We didn't even need to know `A` or `B`, just the combined hash of the two. 

Check out Details for [another example](?tab=details&scroll=Another%Example).