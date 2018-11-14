## Unsigned Integers

The keyword `uint` in Solidity is an unsigned integer. Unsigned meaning it does not use a bit to indicate whether or not the number is positive or negative. 

By default the `uint` keyword will default to a `uint256` where 256 is the number of bits that will be used to store the integer. 

Check out the [Solidity Documentation on Integers](http://solidity.readthedocs.io/en/v0.4.18/types.html#integers) for more info! 

## Element Lookup in Arrays

Recall that when we want to lookup a value in an array we can pass in an index:

```
Meeting storage meeting = meetings[0];
```

This would give us the first `meeting` in the `meetings` array.

## Property Lookup in Structs

For a struct we should be able to look up properties using the `.` notation so if we have a property `time` on our `Meeting` struct:

```
uint time = meeting.time;
```

This will allow us to look up the time from our `meeting` instance. 