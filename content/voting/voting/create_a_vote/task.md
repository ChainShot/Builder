## Creating Votes

Alright, let's get started, shall we?

### Public Votes

Let's create a  [public member array](?tab=details&scroll=Arrays) `votes` which contain instances of a `Vote` [struct](?tab=details&scroll=Structs).

### Vote Struct

The `Vote` [struct](?tab=details&scroll=Structs) will contain both the `address` of the vote creator and a `string` for the vote question. 

### New Vote Function

Finally let's create an  `external` function for creating new votes called `newVote`. 

This `newVote` method will be passed a `string` argument which contains a question for the vote. Use this `string` and the `msg.sender` to populate a new `Vote` struct instance and `push` it on the `votes` array. 