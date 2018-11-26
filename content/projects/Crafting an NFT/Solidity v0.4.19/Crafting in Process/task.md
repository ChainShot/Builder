Implement the [ERC-721](?tab=details&scroll=ERC-721) standard to create a [Non-Fungible Token](?tab=details&scroll=Non-Fungible%20Token) (NFT) contract where:

- The owner of the contract can create a game item and assign the item to an address
- The created game items are stored in a data structure called `gameItems` which associates an `itemId` to the respective `GameItem`
- The assigned owners of the game items can trade their items

Import the ERC-721 contract, setup Marketplace to inherit its functions and use the appropriate ERC721 functions to pass the tests.

> Tip: `ERC721.sol` sits at the same directory level as `Marketplace.sol`
