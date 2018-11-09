## Countdown to Zero!

Your task is to create a Vyper Smart Contract that can store ether and countdown from a given number to zero. Once the countdown reaches zero, the ether should be given to the last person who called the contract. Then the contract should self-destruct.

To do this, you'll need to create two public functions.

### Constructor

First, create a public constructor which is called when the contract is deployed. 

This function should be able to take ether payments, or in other words, it should be `payable`.

This function will need to take in a `uint256` count, which is the initial value to start the countdown at. You'll need to store this value so it can be decremented on every `tick`.

To see an example of a constructor, take a look at [this example](https://vyper.readthedocs.io/en/v0.1.0-beta.3/vyper-by-example.html#simple-open-auction).

### Tick Function

Create a public function called `tick` that will take the count and decrement it. 

If the count should ever reach zero, this function should destroy the contract and send all funds to the person who called the function.

A certain [built-in function](https://vyper.readthedocs.io/en/v0.1.0-beta.3/built-in-functions.html#built-in-functions) will be helpful for this particular functionality.