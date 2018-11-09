## Creating the Genesis Block

Now we're going to add the [Genesis Block](?tab=details&scroll=Genesis%20Blockchain) to our blockchain.

The `Blockchain.js` file contains the `Blockchain` class with a `chain` array. When a new `Blockchain` is instantiated, we're going to want to build the genesis block. 

Let's create a new Block in the Blockchain Constructor and add it to the `chain` array.