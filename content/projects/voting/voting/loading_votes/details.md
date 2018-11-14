## Aragon Intents

In Aragon an intent means an attempt to invoke an action from the smart contract. The idea is that the `intent` is what you want to do and then Aragon's governance system will help you figure out how to get that `intent` accomplished according to governance rules in place. 

Once we have an Aragon app setup from our aragon client library, we can simply call a method or use `call` to retrieve data without modifying the state of smart contract. Since it's what we'll be using here's an example using `call`:

```
const app = new AragonApp()

// Sends an intent that we would like to call the 
// orderPizza function our contract with an argument 2
app.call('orderPizza', 2)
```

You can find more about the call method [here](https://hack.aragon.org/docs/aragonjs-ref.html#call)

## Observables

Observables are a proposal for ESMAScript and are implemented by several libraries. They are a type designed for better handling of asynchronous events and are especially well suited towards handling asynchronous behavior in UIs. 

It's not necessary to be an expert with observables to pass this stage. We'll just need to understand the objective behind the `map` function. We're trying to take some object and transform it. So to stick with the pizza example above:

```
app.call('orderPizza', 2)
      .map(pizza =>  {
           pizza.count = parseInt(pizza.count);
           return pizza;
       }) 
```
Alternatively, instead of modifying the `pizza` object we could pass back a new object with all the `pizza` properties plus the new ones that we want to transform.

To learn more about observables check out this [proposal Github page](https://github.com/tc39/proposal-observable)