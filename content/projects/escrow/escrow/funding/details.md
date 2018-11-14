## Payable Keyword
In order to fund a contract with Ether, the **payable keyword** must be added to a function. Let’s update our constructor function to accept Ether by adding the payable modifier.

```
function() public payable { }
```

Just by adding ```payable``` to our function, we are able to **fund our contract with no additional Solidity code!**

In later stages, we will learn how to create a JavaScript API which will call the constructor function and pass in the desired funded value. 

Refer to the [Contracts](http://solidity.readthedocs.io/en/v0.4.19/contracts.html) section in the Solidity documentation for more information on function modifiers.
