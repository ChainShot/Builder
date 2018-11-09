## Storing ERC20 Tokens

So at this point, the question may occur to you: What if we wanted to store ERC20 tokens or anything more complex transaction for that matter?

It turns out, it's quite simple to add this flexibilty. All we need to do is add the ability to execute bytecode as part of our multisig execution. 

## Adding Bytes

Let's first start by adding a `bytes` array as the last member of our `Transaction` struct.

Once you've done this, you'll notice the compiler complaining about where we created our struct. We'll need to pass in `bytes` into `submitTransaction`, then through to `addTransaction` to store in our `Transaction` struct.

Finally, we'll need to execute our bytecode inside of the `executeTransaction` function. We'll want to be able to handle regular ether transactions as well as anything more complex with our `bytes`.

