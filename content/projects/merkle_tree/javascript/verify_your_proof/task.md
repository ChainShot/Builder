## Verifying your Proof

Almost done! Remember that proof that we just made in the last stage? It's time to verify it. The test cases will include some valid proofs and some invalid proofs, your algorithm will need to know the difference.

**The `verifyProof` Function**

In your `verify.js` file there is a the stub of `verifyProof` function. This function will take four parameters: `proof`, `node`, `root` and `concat`. Here are their definitions:

1. `proof` - The proof we created in the previous stage. It's an array of objects containing the `data` and whether or not the node is in the `left` position.
2. `node` - The node we're trying to prove is within the merkle tree. If, along with the proof data, it can be concatenated to form the merkle root then the proof is valid!
3. `root` - A [buffer](?tab=details&scroll=Buffer%20Class) that is the resulting merkle root from the concatenation of all the leaf nodes in the merkle tree. 
4. `concat` - The method used to concatenate the leaf nodes. The returned value is a [buffer](?tab=details&scroll=Buffer%20Class). 

Once you have concatenated all the nodes together, you can compare it to the `root` node with the `.equals()` [method](https://nodejs.org/api/buffer.html#buffer_buf_equals_otherbuffer).

Check out the Details tab for an [example proof](?tab=details&scroll=Example%20Proof).