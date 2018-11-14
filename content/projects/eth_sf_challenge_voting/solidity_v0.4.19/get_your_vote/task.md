## What's my vote?

Forgot what you voted? Let's create a function on our smart contract function that will allow users to look up what their vote is!

This function will be called `myVote` and should return an `int` indicating the user's vote. We return an  `int` so we can represent three values:

1. No Vote - For a address that has no registered vote, return the value `-1`
2. False - For an address that voted negatively, return the value `0`
3. True - For an address that voted positively, return the value `1`.