### Stash.sol 

The `Stash.sol` smart contract should function as a limited bank. It allows smart contracts to add to their balances incrementally and withdraw balances all at once. It keeps track of all balances in it's `balances` mapping, which maps an address to the balance that it is allowed to access. 

### Chipmunk.sol

The `Chipmunk.sol` smart contract is attempting to exploit the security vulnerability in the Stash smart contract. This contract should be allowed to deposit and withdraw balances without affecting the funds of other accounts. 

### Squirrel.sol 

The `Squirrel.sol` smart contract is interacting with the `Stash.sol` in the intended way, simply trying to store and withdraw the balances it should have access to. 

### tests.js 

This file holds JavaScript tests that are used to test the functionality of our smart contracts. It ensures that the squirrel can properly deposit and withdraw. It also checks to make sure that the chipmunk can only deposit and withdraw the funds that they put in. 