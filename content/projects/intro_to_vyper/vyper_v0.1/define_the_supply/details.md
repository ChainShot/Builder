## State Variables

State Variables are variables that persist data on the blockchain. This means that the value stored in these variables can be accessed and updated across transactions. 

As such, we define them on the contract itself rather than inside of a function: 

```
myVariable: uint256
```

This variable should be declared on the top-level, outside of any function. Any function within the contract can access it with `self.myVariable`. 

## Public State Variables

You can use the `public` function for a variable to automatically create a getter that can be used to retrieve the state externally:

```
myVariable: public(uint256)
```

This will automatically create a getter function that can be called externally (i.e. `contract.myVariable()`).

> The use of lower camelCase may be surprising here to those familiar with the python language. This is used instead of snake_case as a result of interoperability across Ethereum languages where the casing of a function name changes the compressed function signature. See more discussion about the Vyper style guide [here](https://github.com/ethereum/vyper/issues/905).

## Unsigned Integers

An unsigned integer means that there is no "sign" or indication of positive/negative numbers. Instead, the possible values start at zero and move to increasingly larger values. 

An unsigned integer in Vyper can be declared with `uint256` where the values that can be stored range from `0` to `2^256 - 1`.

## Constructors

For Smart Contracts, a special function can be defined that is called when it is first deployed to the blockchain. This function is called its constructor. 

In Vyper specifically the constructor is defined with the name `__init__`. It can take in arguments like any other function: 

```
myVariable: public(uint256)

@public
def __init__(_myVariable: uint256):
    self.myVariable = _myVariable
```

Notice the use of `self` here inside of our constructor. In order to refer to a state variable from within our functions, we need to use this keyword. 

> The underscore prefacing the argument name can be used to indicate that this is a private variable. This is *recommended* style in order to avoid name clashing with global variables, which would fail to compile.