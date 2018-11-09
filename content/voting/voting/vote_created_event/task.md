## State Update

Now we're going to working on `stateUpdate.js`. We will use this function for our Aragon [store reducer](?tab=details&scroll=Store%20Reducer) to listen to events from our `Voting` contract and update our `state` accordingly.

### Creating our Initial State

Our `state` should store an array of `votes`. If the `state` passed into the `stateUpdate` is `null` we should make sure to give it an initial value of `{ votes: [] } `.

>  NOTE: the initial state is always `null`, not `undefined`, because of JSONRPC limitations. Keep in mind that JavaScript default parameters will only work with `undefined`.

### Updating the State

Next we'll take a look at our `data` parameter. It will contain two properties `event` and `returnValues`. The `event` property will be a string telling us the name of the `event` and the `returnValues` will be an array that will contain the value sent from our smart contract events (the vote id).

If the `event` is `VoteCreated` then we should load the vote that was created. To do so we'll take the id from our `returnValues` and pass it `loadVotePromise` created by our [toPromiseFunction](?tab=details&scroll=Observable%20to%20Promise) utility. This function will return a promise that will resolve with our vote that we can add to our current state. 

If the event is not `VoteCreated`, we should just return the `state` without any changes.