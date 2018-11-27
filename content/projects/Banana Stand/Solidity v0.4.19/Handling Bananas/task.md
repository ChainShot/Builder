## Manage the Banana Stand

Let's write a contract that will allow us to add and remove bananas from our banana stand. We'll need to be careful not to add too many or remove too many bananas! 

### Public Bananas 

First add a public `bananas` unsigned integer member variable. For our small banana stand we don't need to contain that many bananas, so use an unsigned integer type that will only take up [8 bits](?tab=details&scroll=Bits). 

### Add Bananas

Create a public function `addBananas` that will allow us to add bananas to our banana stand. It should take an 8-bit unsigned integer passed and add it to our `bananas` member variable.

We'll want to be careful not to [overflow our banana container](?tab=details&scroll=Integer%20Overflow).

### Remove Bananas

Create a public function `removeBananas` that will allow us to remove bananas from our banana stand. It should take an 8-bit unsigned integer passed and subtract it from our `bananas` member variable.

We'll want to be careful not to [underflow our banana container](?tab=details&scroll=Integer%Underflow).