## Return a hash from the Block

In your `block.js` file there is a class representing a [Block](?tab=details&scroll=What's%20a%20block%3F). Our goal in this stage is to create a hash property on this block.

Using the `SHA256` function from the [Crypto JS Library](?tab=details&scroll=Crypto-JS), return any  [hash](?tab=details&scroll=Hash%20Function) from within the `toHash` function. 

For now, there's no need to hash anything in particular since the block contains no properties. You can hash a message, an empty string or nothing at all! 