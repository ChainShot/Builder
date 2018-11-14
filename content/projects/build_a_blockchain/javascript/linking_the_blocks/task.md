## Linking The Blocks

This could arguably be the most important step in creating a blockchain implementation. We need to include the `previousHash` of each block in it's current `hash`. By doing so we create a link from the very genesis block all the way to the most recent block. The [Details](?tab=details) tab explains this further. 

To pass this step we simply need to make sure to include that `previousHash` in the `hash` calculation step in our `Block` class.