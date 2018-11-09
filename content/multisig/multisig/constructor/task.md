
## Contract Setup

First, let's create two variables: 

1. Declare a public `array owners` to store wallet owner addresses
2. Declare a public `uint256 required` to store the required amount of confirmations needed to execute a transaction.

## Constructor

Define a constructor function that takes in two arguments: an array of owner addresses and the uint256 required amount of confirmations.

**Edge Cases**

Be sure to handle the following edge cases:

1. The number of owner addresses passed in should be greater than zero.
2. The number of required confirmations passed in should be greater than zero.
3. The number of required confirmations should not exceed the amount of total owner addresses.