## Store Reducer

The Aragon store reducer is very similar to a pattern you may come to expect with libraries such as redux. If you haven’t worked with redux before don’t worry! Essentially a reducer is a function that takes in a `state` (or a bunch of properties) and determines how that `state` is modified for a particular `event`.

Every time an `event` is broadcasted from our solidity contract this function will be called and we can choose how we would like to modify our application's `state` accordingly. 

To learn more about the `store` function, visit the [Aragon JS Documentation](https://hack.aragon.org/docs/aragonjs-ref.html#store)

## Observable to Promise

We've written a utility in `toPromiseFunction.js` that takes a function returning an observable and turns it into a function returning a promise. This is helpful to simplify things in this example because we're only expecting one value back from our `loadVote`. An `observable` is more useful in cases where multiple values are expected back. 

By turning this into a promise function we can simply call `await` to get the resolved value: 

```
let vote = await votePromiseFn(0); 
```