The functions below will help our front-end retrieve specific information about the wallet.

## Get Transaction Count

1. Define a `getTransactionCount` public view function with a pending `bool` and an executed `bool` as it's arguments. The function should return a `uint` count of transactions.

The purpose of this function is to give the front-end the ability to receive a count of pending or executed, or both, transactions.

## Get Transaction IDs

2. Define a `getTransactionIds` public view function with a pending `bool` and executed `bool` as it's arguments. The function should return an array of transaction IDs.

The purpose of this function is to give the front-end the ability to receive a list of pending or executed, or both, transaction IDs. 

Remember that the returned array should be a fixed size of the amount of ID's you want to return per your parameters.


## Get All Owners

3. Define a `getOwners` public view function which returns an array of owners addresses

The reason we cannot just retrieve all owner addresses using our already defined `owners` array is because the getter method created from the public variable `owners` only allows us to key into the `owners` externally. Therefore, we need to create this helper function to return an array of all of the wallet owners.