## Example Proof

In the previous stage we used the `ABCDE` merkle tree and created a proof of `C` being in the tree.

### ABCDE Merkle Tree

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

As we said in the previous stage, the hash path is as follows:

```
Hash(Hash(AB + Hash(C + D)) + E)
```

In order to verify this proof then we need to take three steps:

1. Hash `C` and `D`
2. Hash the result together with `AB` (prepend it)
3. Hash the result together with `E` (append it)

After this is complete, our resulting hash is our merkle root: `ABCDE`. 

## Buffer Class

The [Node JS Buffer Class](https://nodejs.org/api/buffer.html#buffer_class_buffer) allows us to easily interact with binary data. 

To compare buffers we can use the `.equals()` [method](https://nodejs.org/api/buffer.html#buffer_buf_equals_otherbuffer).