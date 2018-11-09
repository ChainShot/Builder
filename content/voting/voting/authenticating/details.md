## Aragon OS

A series of smart contracts put out by the Aragon team that allows us to bake in upgradeability and governance into our smart contracts. 

Learn more about Aragon OS [here](https://hack.aragon.org/docs/aragonos-ref.html)

## Imports

With Solidity the simplest type of import is the full import: 

```
import "contracts/contract.sol";
```

There are other syntaxes and forms of imports that can be found [here](http://solidity.readthedocs.io/en/v0.4.19/layout-of-source-files.html#importing-other-source-files)

## Inheritance

To inherit code from a contract, you can simply use the `is` keyword as shown here:

```
contract Tiger is Animal {

}
```

Where `Tiger` will inherit methods from the `Animal` base contract. You can learn more about inheritance from the [Solidity Documentation](http://solidity.readthedocs.io/en/v0.4.18/contracts.html#inheritance)

## Roles 

Aragon OS allows us to create new roles for particular addresses, which can restrict/allow their ability to do certain actions. Thankfully creating new roles with Aragon OS is easy! 

First let's consider a role for ordering pizzas:

```
bytes32 constant public ORDERING_PIZZA_ROLE = keccak256("ORDERING_PIZZA_ROLE");
```

What's happening here? We're storing a 32 byte (or 256 bit) hash that will represent our ordering pizza role. Since this is a unique hash we'll be able to use this hash as our lookup any time we want to see if someone is authorized to order pizzas. 

## Auth 

To use a role on a method, we can simply use the aragonOS `auth` modifier with our 256 bit hash. So to keep with the pizza role example from above:

```
function orderPizza() auth(ORDER_PIZZA_ROLE) external {

}
```

Anyone who wants to use this method will have to first be authorized to do so, and these roles can be shared across methods as needed. 