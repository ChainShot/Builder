## ERC20 Treasure Chest

For this challenge we're going to create a Treasure Chest for ERC20 tokens!

Anyone can store ERC20 tokens in the Treasure Chest. This is allowed by default in the [ERC20 token standard](?tab=details&scroll=ERC20%20Standard). 

We want to make it so anyone can withdraw any ERC20 token balance from the Treasure Chest. That way, treasure hunters can come along and claim their prize! 

### Withdraw function

In order to accomplish our task, implement the `withdraw` function on the `TreasureChest` contract. 

This function will take in an array of ERC20 Token Contract addresses as it's only argument. It will make a call to each ERC20 Contract to transfer the balance of the TreasureChest to the address calling the function.