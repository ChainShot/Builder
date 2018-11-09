## Examples

Let's say we had 96 bytes: 

```
[ bytes 0 - 31 ] [ bytes 32 - 63 ] [ bytes 64 - 95 ]
```

We divide it up into three parts and label them `A`, `B`, and `C` from left to right respectively with the byte ranges shown above. 

First we'll hash `A` and `B`:

```
[   sha3(A + B)   ] [    C    ]
```

Next we'll take the hash of `A` and `B` and concatenate `C` and take the resulting hash from that as well:

```
[   sha3(sha3(A + B) + C)   ] 
```

This pattern will repeat itself for longer byte arrays as well. For example, if we had 160 bytes we can divide it up into five 32 byte parts `A`, `B`, `C`, `D`, and `E` from left to right respectively.

Following the same algorithm we'd wind up with a single hash:

```
sha3(sha3(sha3(sha3(A + B) + C) + D) + E)
```