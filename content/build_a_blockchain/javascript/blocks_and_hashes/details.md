## What's a block?

Quite simply you can think of a block as a container. It contains some metadata about it's creation and data contained within it. These properties are hashed together into a string of fixed length to link this block to other blocks in a blockchain. 

## Hash Function

Hash functions are used to take messages of any size and reduce them down to a series of bits of a specific size.  

An ideal cryptographic hash function can, given any input, return a consistent and seemingly random output. The randomness characteristic needs to be strong enough where it's not possible to re-construct the input from the output.

For example the `sha256` algorithm will take an input like `Dan` and return a consistent output: 

`b1259567b8a27cd0ee0ce4c79d0670c75bada9e86dcdeff374ffd922d41cbe7e`

If, instead my input was the lower case `dan`, the result would be **completely** different: 

`ec4f2dbb3b140095550c9afbbb69b5d6fd9e814b9da82fad0b34e9fcbe56f1cb`

These outputs appear random in relation to their input and are also **consistent**. Meaning the same input will always return the same output. 

## Crypto-JS

The `crypto-js` library provides us with a number of cryptographic utilities written as JavaScript function. Specifically the `SHA256` method is an implementation of the SHA256 algorithm designed by the NSA. This function will take any string as an argument, regardless of size, and hash it to a 256 bit array. If we call `toString()` on that returned object we'll receive a 64 character hexadecimal string.

## Hexadecimal

You'll notice that the outputs shown consist of a set of characters spanning `a` through `f` and `0` through `9`. This is because it has become commonplace to use hexadecimal when displaying a hash. 

For the test file in this stage you'll notice that the hash of the block is being tested by the regex `/^[0-9A-F]{64}$/i`. It's simply testing to see that this is a hexadecimal output of 64 characters. This is the expected size for a `sha256` hash. 

For now the hash can be anything, in the next stage we'll start to make it specific to the block.