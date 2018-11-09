## Best Part of making a token...

...is naming it, of course! Now's your chance.

### Create a Token Symbol 

First let's create a token symbol. This `symbol` will be used as short ticker, so let's make it between **1 and 5 capital letters**. In order to do that, we'll need to create a [byte array](?tab=details&scroll=Byte%20Array) called `symbol`. 

This should be a public state variable on our contract and should be initialized in the constructor.  

Go ahead and give it whatever symbol you'd like! `I`, `FOO`, `BAR`, `PIZZA`, any 5 capital letters.

### Create a Token Name

Similar to the token `symbol` let's create another [byte array](?tab=details&scroll=Byte%20Array) called `name`. This should be a public state variable and initialized in our constructor as well.

Feel free to choose a bytes array of any length and name your token whatever you'd like! 