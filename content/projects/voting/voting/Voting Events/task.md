## Voting Events

The [Aragon Client library](?tab=details&scroll=Aragon%20JS) will be hooked up to listen to events from your Solidity smart contract, so our next step is to make some events to let the front-end know something has changed! 

Let's create two [solidity events](?tab=details&scroll=Solidity%20Events):

1. `VoteCreated` - Lets the front-end know when a vote has been created and a `uint256` which is the votes index in the votes array.
2. `VoteCast` - Lets the front-end know when a vote has been cast and, just like `VoteCreated`, it passes a `uint256` that is the vote index. 

When our front-end receives these events it will know that the particular vote has been created or updated so it can look up its current state.