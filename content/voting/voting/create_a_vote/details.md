## Structs 

Structs are a way to define your own data type that encompasses many different data types. It's pretty similar to a classic C struct or an object in JavaScript.

A solidity struct looks something like this:

```
struct Meeting {
     bool started;
     uint lengthInMinutes;
}
```

A new struct can be created like so: 

```
Meeting storage meeting = Meeting(false, 30);
```

You'll notice the keyword `storage` was used here. This indicates that we're referencing an object in the actual smart contract state. 

By changing the `meeting` variable here we recognize we are changing a value stored on the actual smart contract. For more information on data storage works in Solidity check out the documentation on [Data Location](http://solidity.readthedocs.io/en/v0.4.18/types.html#data-location)

And for more information on structs, check out the [Solidity Documentation for structs](http://solidity.readthedocs.io/en/v0.4.18/types.html#structs)

## Arrays

An array can hold a collection of data elements in Solidity. For example, for a collection of the data type `address` it can be declared as followed:

```
address[] public myFriends;
```

Where I have a list of my friends addresses. The `public` keyword here allows us to send a message to the contract asking for the address at a specific index in our array. 

A new address can be added by pushing it onto an array:

```
myFriends.push(address);
``` 

Or by specifying the index at which I'd like to store the new address:

```
myFriends[0] = address;
```

Similarly the address can be looked up by an index. At any point the length can be looked up through the member `length` property. 

For our purposes it's important to note we can also create an array of structs like our `Meeting` [struct](?tab=details&scroll=Structs). Something like:

```
Meeting[] public myMeetings;
```

For more detailed information on arrays check out the [Solidity Documentation for arrays](http://solidity.readthedocs.io/en/v0.4.18/types.html#arrays).