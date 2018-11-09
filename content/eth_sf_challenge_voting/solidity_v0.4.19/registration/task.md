## Registration Begins!

Hey there! It's time to register some voters. Your task is to create three functions on the smart contract that will allow a single owner to register new voters and allow the registered voters to vote.

## Constructor Owner

First create a constructor that will register the `owner` as the person who deploys the smart contract. Only the 'owner' will be allowed to `register` new voters. 

## Register Voters 

Create a function called `register` that will take an `address` and register that voter.

## Vote 

Create a function `vote` that will capture a registered voter's vote. 

This function will take in a `bool` that indicates whether or not the voter supports the vote. You can store the vote any way you wish for now. 

Ensure that if a non-registered voter calls this function, it will `revert`. 