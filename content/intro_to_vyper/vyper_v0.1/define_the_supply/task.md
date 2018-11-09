## It's Vyper Time

Let's do something exciting and create our own simple token implementation!  

### Create a Supply for our Token

To start, let's create a [state variable](?tab=details&scroll=State%20Variables) called `supply` that is an  [unsigned integer](?tab=details&scroll=Unsigned%20Integers) and  [public](?tab=details&scroll=Public%20State%20Variables). This value will be the total number of tokens created. 

Once you have added this state variable, you should notice your first validation is complete for creating a `supply` getter. 

> If the `supply` validation isn't passing and your compilation is not failing, check to make sure you made `supply` [public](?tab=details&scroll=Public%20State%20Variables).

### Create the Constructor

Next we'll need to create a [constructor](?tab=details&scroll=Constructors), which will be called when the contract is deployed. This constructor should take in a `uint256` and store it in our contract's `supply` state variable.