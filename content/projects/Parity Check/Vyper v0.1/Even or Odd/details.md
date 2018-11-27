## Left Padded Bytes32 Array

The left-padded `bytes32` array will contain some integer value padded on its left by a string of zeroes for every unused bit. For instance the value `15` would be:

In Hexidecimal:
```
000000000000000000000000000000000000000000000000000000000000000f
```

In Binary:
```
0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111
```

> Vyper has built-in [explicit conversion](https://vyper.readthedocs.io/en/latest/built-in-functions.html?highlight=convert#convert) that will be useful for this challenge. 