## Tally the votes! 

Now we'll need to create a way for people to weigh in on whether they support or reject a vote. 

### Add Tally Member Variables

We'll need to create two [unsigned integers](?tab=details&scroll=Unsigned%20Integers) that we will add to our `Vote` struct: 

1. `uint256 yes` - The number of voters who support the vote.
2. `uint256 no` - The number of voters who do not support the vote

### Cast Vote Function

Let's create a function `castVote` which takes in two arguments:

1. A `uint256` vote id that corresponds to the index of the vote in our `votes` array. Using this index we'll be able to lookup the vote.
2. A `bool` that indicates whether or not this particular voter supports the `vote`. 

This function should update our `yes` and `no` variables on `Vote` so we can see the total number of voters and how many support or reject the vote. 
