## Events
It should be noted that using **Events cost additional gas** and can become quite expensive. Because of the gas cost, you should think about how an event will benefit your application before implementation as it is not always necessary.

This event will log the balance of the contract before transferring the balance to the beneficiary.

Define an event called ```Approved``` whose argument is the contract balance. 

Remember that **all variables must have a type** (even within function parameters) including integers. It is common to use a **256 bit unsigned integer** in this case. 

```
event Approved(type variable);
```

Lastly, invoke the Approved event within the approve function, passing in the contract balance.

Visit the Solidity documentation for more information on [events](http://solidity.readthedocs.io/en/v0.4.19/contracts.html#events).

## Truffle Event Bug

If you happen to run into an issue while running your tests:

```
TypeError: Cannot read property 'constructor' of undefined
```

This is a known Truffle issue and we're waiting for a resolution. 

You're likely running into this because you did not give your event variable a name:

```
event DoSomething(uint);
```

Instead of:

```
event DoSomething(uint variableName);
```