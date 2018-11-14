## Adding Data to the Hash

Our next step is to add a `data` property to our `block`. This `data` will contain some arbitrary string for now. It will be passed in through the constructor of the `block`. 

To make the hash signature specific to the block and its contents, we'll also need to pass the `data` into our `SHA256` hashing function. 