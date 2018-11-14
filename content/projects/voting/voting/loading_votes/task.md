## Loading Votes

Our next task is to load data from the our smart contract state into our front-end. To do so we're going to use the [Aragon JS library](https://hack.aragon.org/docs/aragonjs-ref.html)

Specifically we're going to write a function which sends an [intent](?tab=details&scroll=Aragon%20Intents) to the Aragon wrapper to load the vote.

Already written for you is the function `loadVote` which returns an [observable](?tab=details&scroll=Observables). We'll need to make two changes to this function to get the vote data we need for our application:

1. Lookup the vote using the [call](https://hack.aragon.org/docs/aragonjs-ref.html#call) method on the AragonApp. We'll need to call our `votes` method with the `id` for that particular vote.
2. Use the [observable](?tab=details&scroll=Observables) `map` function to take the vote returned and transform it. The `vote` will have the `yes`, `no`, `creator` and `question` properties. Be sure to:
    * Parse the `yes` vote count from a string into an integer 
    * Parse the `no` vote count from a string into an integer 
    * Pass along the vote `id` as one of the properties
    * Include the `creator` and `question` properties 