## Byte Array

A **byte** is eight `1`s and `0`s (called bits) so it can store the values `0000 0000` through `1111 1111` or `0` through `255` in decimal. 

A **byte array** is simply a collection of **bytes**. We want to be able to store characters in our bytes array, how many can we store? 

Using [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoding we can fit one character into a byte. As such the length of a byte array is directly tied to the number of characters we can store inside of the array. For instance:

```
value: bytes[5]
value = "apple"
```

Works great! 

Similarly, if we tried to store just "a" it would work as well. For `bytes[n]`, `n` indicates the **maximum** number of bytes we can store.

If however, we tried to store `"apples"` inside our `bytes[5]` we'd get the following compilation error:

```
Cannot cast from greater max-length 6 to shorter max-length 5
```

> We should be frugal with the memory we store on the blockchain, so we should make sure to only use the memory space we need. If we know ahead of time that we only need 5 characters, we should make a byte array of length 5. 