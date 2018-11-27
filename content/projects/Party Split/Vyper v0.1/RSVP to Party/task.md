## Let's Start a Party!

This challenge is all about creating a party with your friends and splitting a shared expense.

### Constructor Function

The first thing you'll need to do is create a constructor function which will set the minimum amount it will cost someone to RSVP for the party.

The constructor function will take in a `uint256` minimum amount. Store this for later. It must be paid by the participants, or they cannot join the party!

### RSVP Function

Create a public function called `rsvp` that will allow your friends to join the party. 

In order to `rsvp` each friend needs to send the minimum amount of ether established in the constructor. Be sure to make the `rsvp` function `payable`! 

If they do not send this amount of ether, then send them their money back and do not include them. 

If they send more than this amount of ether, refund them the difference and let them join the party. 

### Pay Bill

Once the party's over, it's time to pay the shared expenses! 

We made sure that the minimum threshold we set in the constructor was enough to **at least** cover all the expenses.

It's possible that the total party expenses will come out to be less than the total amount paid. In that case, we'll want to refund everyone accordingly.

Create a function `payBill` that will accept one argument: a `uint256` amount which is the final bill. This function will ensure that if there is any remaining funds it is refunded evenly.