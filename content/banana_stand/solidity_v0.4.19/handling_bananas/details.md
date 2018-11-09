## Bits

Bits are the number of binary 1's and 0's in memory we can use to store the value of our variable. 

For an unsigned (no positive or negative indication) integer we can store values from `0` to `2^n - 1`  where `n` is the number of bits. So for a 4-bit unsigned integer we would expect to be able to store from `0` to `15`.

Solidity allows us to create unsigned integers using the `uint` keyword and we can designate the storage space in steps of 8 from 8 to 256 by adding the number to the `uint` keyword (i.e. `uint8`, `uint16`, `uint24`, etc...).

The [Solidity Integer Documentation](https://solidity.readthedocs.io/en/v0.4.19/types.html#integers)  explains more.

## Integer Overflow 

If you go over the range of the memory space allocated it's considered an overflow and the value will be `0`. 

For instance, if we have a 4-bit unsigned integer we have the range `0` through `15`. If we try to add two 4-bit integers together who both have the value `8` we'll wind up with a unsigned integer with the value `0` since `16` is one beyond the range of values.

## Integer Underflow

Similar to Integer Overflow, if you go below the range allocated it will begin at the highest value. 

So for a 4-bit integer where you subtract `5` from `4` you'd end up with `15`, because `4 - 5` would be a negative one which is below the range of an unsigned integer. 
