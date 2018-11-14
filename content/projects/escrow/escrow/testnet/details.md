## Testnet

Before deploying to the mainnet, we will deploy to the testnet. This allows us to test our application without using any ether. However, we will be using test-ether in order to deploy and interact with our smart contract within our testing environment.

## MetaMask

Metamask is a software that allows us to interact with the blockchain from the comfort of our browser. Visit the [MetaMask website](https://metamask.io/) to download the browser plugin.

Once installed, click on the Metamask icon in your browser and follow the steps to create your wallet address. Make sure to securely store your password and seed phrase! Your seed phrase is will allow you to access your account if you ever forget your password.

When logged in, you can check your account balance and interact with buy/sell transactions on the blockchain. By default, your account will most likely be set to the Main Ethereum Network. You will want to connect to a test network of your choice in order to receive test-ether from a faucet.

## Faucets

A faucet is an industry term used to describe a network that **‘drips’** test-ether to a provided public Ethereum address. The test-ether is exactly as the name states, it has no real value and is used specifically for testing purposes.

Here are some faucets to check out on different networks:

- [Kovan](https://github.com/kovan-testnet/faucet)
- [Ropsten](http://faucet.ropsten.be:3001/)
- [Rinkeby](https://faucet.rinkeby.io/)

Each faucet has a different way to request test-ether including live-chats where you provide your public key and amount needed as well as an input box that sends a fixed amount of test-ether. We recommend Ropsten as you only need to provide your public key and you will receive 1 Ether which is more than enough to test small transactions such as deploying smart contracts.

> **Remember: Ether’s smallest unit is the wei ( *1,000,000,000,000,000,000 wei is equal to 1 eth*)**

After requesting the test-ether, check your Metamask account on the corresponding test network to make sure the test-ether was deposited.

Now we are ready to deploy! **Click the deploy contract button.**

A Metamask notification will appear giving you an overview of the transaction including the associated fee (on the testnet, this fee is subtracted from test-ether). Click Submit to confirm and deploy your contract to the blockchain.

You can check the status of the transaction by going into Metamask and clicking on the most recent transaction in the sent transactions log. This will re-route you to [Etherscan](https://etherscan.io/) which holds the transaction details and can viewed as your receipt of the transaction.
