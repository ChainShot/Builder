## Contract Constructor

The syntax for writing a function in Solidity is similar to JavaScript some differences being that it's a static typed language.

```
function EscrowContract (type varName, type varName2) public {
  // your code here
} 
```

When writing the constructor function, the **function name should match the name of your contract**, the function arguments should have an **associated type** (similar to the address member variables we defined above) and include a **public visibility specifier**. 

The public specifier allows access to the function from within as well as outside of the contract. Visit the [contracts](http://solidity.readthedocs.io/en/v0.4.19/contracts.html?highlight=contracts) section within the Solidity documentation for more information on function visibility.

It should also be noted that when passing in function arguments, it is convention to preface argument names with an underscore ( ```_``` ). This is purely a semantic convention which helps differentiate the global variable and function argument names, as they are usually the same.

Within the constructor function, **assign the global address member variables to their respective function arguments**. 

You might have asked the yourself, *“What about the depositor of the funds?”* Fortunately, Solidity has a global variable which we can leverage in this situation. 

Assign the depositor address to the global variable ```msg.sender```. This built in global variable represents the address of the caller of the specified function, in this case the constructor.

For more information on global variables, check out the [Miscellaneous](http://solidity.readthedocs.io/en/v0.4.19/miscellaneous.html) section within the Solidity documentation!!
