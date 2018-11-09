## Address Parameter

The `address` is a hexadecimal ethereum address string representing the sender of the ether. 

## Resulting Array of Addresses

Similar to the address parameter, the resolved addresses should also be hexadecimal strings representing the addresses of each of the recipients. These addresses should be returned [asynchronously](?tab=details&scroll=Asynchronous%20Function).

## Web3

We're going to be using the JavaScript Ethereum library web3.js, specifically the 1.0 version whose documentation is [found here](http://web3js.readthedocs.io/en/1.0/web3.html). 

Web3 is already pre-configured for you, and can be imported from the `./setup` file. 

## Asynchronous Function

This is an asychronous function, meaning it should either return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or use the [async keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). 

The result of the resolved promise or the `async` function should be the [array of addresses](?tab=details&scroll=Resulting%20Array%20of%20Addresses).