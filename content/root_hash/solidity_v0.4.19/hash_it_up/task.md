## Determine the Root Hash

Hey there! 

The goal of this challenge is to take a potentially large byte array and reduce it to a single 32 byte hash. 

## Reduction Algorithm

The algorithm will work like this:

1. Given a bytes array, divide it into parts 32 bytes long.
2. Concatenate the first two parts, hash them with `sha3`. 
3. Use the result from step 2, concatenate it with the next part and hash them together.
4. Repeat step 3 until reduced to a single `bytes32`.

It's often much easier to look at [examples](?tab=details&scroll=Examples), which are available on the Details pane.

## The findRoot function

On your contract create a `findRoot` function that will take in `bytes` array and return a `bytes32`. 

The `bytes` array will be a collection of bytes of some length divisible by 32. 

The `bytes32` will be the root hash that is determined by the algorithm described above and by the [examples](?tab=details&scroll=Examples).
