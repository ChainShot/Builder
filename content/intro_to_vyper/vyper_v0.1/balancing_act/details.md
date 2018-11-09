## Addresses

In Ethereum, we can have access to our own currency and assets through an `address` on the blockchain that is specifically ours. 

A person can own an address by having their own **private key** which allows them to sign messages and prove their ownership. The network can check the signature against a published **public key**.

> There are plenty of good resources to learn about [public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography). A deep understanding is not entirely necessary for this lesson, although it certainly can be useful!

An address is typically shown as a 40 character hexadecimal string by convention like so: `0xf35074bbd0a9aee46f4ea137971feec024ab704e`. 

In Vyper, we can store and refer to addresses using the `address` keyword. The address can be an individual or it can be another
contract, both of which we are able to send funds or tokens. In addition, if the address is a contract, we are able to call the methods on that contract at that address.

## Mapping

Mappings are super crucial data structures in most smart contracts. They allow us to take a value and map it to some other value. The simplest case is a mapping of an address to some value. 

Take for instance, a mapping of addresses to balances:

```
balances: uint256[address]
```

We can imagine the contents of this mapping to look something like this:

| address | balance  | 
|:---:|:---:|
| `0xa201fe...`  |  100 |
| `0xbeef31...` |  25 |
| `0x001337...`  |  10 |

Given an address `0xbeef31...`, we can quickly look up and see that the balance is `25`:

```
lookup = balances[address]
```

To set a balance we can set the value of balances at that address:

```
balances[address] = 15
```