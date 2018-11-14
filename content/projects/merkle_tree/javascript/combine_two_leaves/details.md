## Constructor

A constructor is a specially named function in a [JavaScript Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Class_declarations) that will be called when an instance is created with `new`. 

To add a constructor, simply use the `constructor` keyword as the name of the function within the class. 

## Concat Function

To simplify this merkle tree implementation and to make debugging easier, we'll pass a concatenation function from the tests into the MerkleTree constructor.

This is the function that combines two leaf nodes and hashes them together. For instance in a four-leaf tree:

```
    Root   
    / \    
   AB  CD  
  / \  / \ 
  A B  C D
```

This function is used three times, for each combination. I'll write it here as `Hash`:

`Hash(Hash(A + B) + Hash(C + D))` 

> If you deep dive into the test cases you'll notice that we can even use the concatenation function to determine the hashing path you used (in the format shown above) to help with debugging in the next few steps. 

