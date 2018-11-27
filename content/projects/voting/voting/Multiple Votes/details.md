## Recommended Approach

There's several approaches to solving this problem and we have one particular recommended approach. 

It begins by adding a [mapping](?tab=details&scroll=Mapping) to our `Vote` struct: 

```
struct Vote {
        address creator;
        string question;
        uint256 yes;
        uint256 no;
        mapping (address => VoteStates) voterStates;
}
```

Where `VoteStates` refers to an [enum](?tab=details&scroll=Enum) of three possible values: `Absent`, `Yes` and `No`.

```
enum VoteStates {Absent, Yes, No}
```

This will allow us to keep track of which users have already voted and what their current state is. 

If you have any trouble [jump into our Slack channel!](https://join.slack.com/t/chainshotnodes/shared_invite/enQtMzU3ODc5NTM3MTI3LTFlZTY1YzcwM2QzYWI0ODY2ZDczMmYzOTVlYWQwZjkyZDFlYzUxZWM4NDNlNjk3N2EyNGMwOGQ0ZTVkZjQyNjE)

## Enum

If we needed to represent three states with a value, you can imagine using numbers, let's say `0`,`1`, `2`. In our minds we can associate states to these numbers like someone not voting could be `0`, someone voting yes is `1` and someone voting no is `2`. However, when we go back to look at the states it's pretty difficult to tell what they mean in the code.

Consider:

```
if(status == 1) { 
  // do something
}
```

Unless you happen to know what that number means, this code isn't very readable. For that reason Solidity, like many languages, introduces the `enum` type. 

We can create a list of states:

```
enum VoteStates {Absent, Yes, No}
```
And then we can use those states to assign and look up a state:

```
VoteStates state = VoteStates.No;
if(state == VoteStates.No) { 
  // do something
}
```

You can find more information on enums in the [Solidity Documentation](http://solidity.readthedocs.io/en/v0.4.18/types.html#enums)

## Mapping 

Often it's useful to create an easy way to lookup values by a particular key. In these cases, a `mapping` can be super useful. We'll map a particular `value` to some output value. 

For instance, if we held a contest it might be useful to have a mapping of our participants addresses to whether or not they have submitted an entry. Something like that might look like this:

```
mapping(address => bool) submissions;
```

Then we can lookup by address whether or not the participant has made a submission with `submissions[address]`. Maybe even more useful would be if we had a struct for submissions and we could map the participant's address to a data type with more information about their submission!

How could this useful for our voting application? We'll want to consider whether or not someone has voted before. If so, we'll want to use that vote to determine what we should do to the total tally in order to not count them twice. 