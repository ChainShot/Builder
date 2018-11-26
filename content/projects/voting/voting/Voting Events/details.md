## Aragon JS

The Aragon JS library helps provide the glue between your smart contract and what is used by the front-end. Part of that process is to pass any Solidity events and their respective arguments through a state reducer. 

We'll be going through the Aragon JS library further and writing the state update functions on a later step. 

## Solidity Events 

Solidity events are useful for logging as well as indicating to the front-end that some particular change in the smart contract's state has just occurred. 

Take for instance if someone's balance for a smart contract changed, we might create an event:

```
event BalanceUpdate(address user)
```

This might tell our front-end that a user's balance has changed, which could let it know to reload the balance from the smart contract state.

We can broadcast this event from within a function with an address:

```
BalanceUpdate(msg.sender);
```

For more information on Solidity Events check out the [Solidity Documentation](http://solidity.readthedocs.io/en/v0.4.18/contracts.html#events).

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