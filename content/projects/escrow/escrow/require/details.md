## Require Statement

Solidity allows you to call functions to revert state changes in the event that you should run into some unexpected condition. This will allow us to write conditional statements (like permissions in our case) that will ensure something is true, otherwise it will throw an exception.

One of these functions is `require` and its syntax looks as follows:

```
require(conditional logic);
```

Let's use this to ensure the `arbiter` is the only one allow to approve the escrow funds transfer. 

> Hint: Remember to use `msg.sender` to identify the caller of the function.