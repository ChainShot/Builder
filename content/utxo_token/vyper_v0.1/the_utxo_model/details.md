## UTXO Model

UTXO stands for Unspent Transaction Output. UTXO is an alternative way to track balances instead of an account model like the one used in Ethereum. 

With an account model your account might have a nominal balance of $1000. Every transaction will add or subtract from this balance. In a UTXO model you could instead be the owner of several UTXOs that together add up to $1000. A transaction could spend your UTXO and/or give you a new UTXO.

Let's take a look at an example.

### Example

Alice begins with a UTXO of $100.

Alice wants to send $20 to Bob so she'll need to spend the $100 UTXO. Bob will receive a new $20 UTXO. The remainder will come back to Alice as a new $80 UTXO.

Bob wants to send $20 to Charlie. Bob will spend his UTXO and Charlie will get a new UTXO for $20. Since there is no remainder, Bob will not receive a new UTXO.

Alice also wants to send $20 to Charlie. She breaks her $80 UTXO, sends a $20 UTXO to Charlie and receives a new $60 UTXO for the remainder.

At the end of all of these transactions Alice has one $60 UTXO, Bob has no UTXOs and Charlie has two $20 UTXOs. 

A benefit of the UTXO model is that transactions that do not depend on the same origin UTXO can be run in parallel and the state changes achieved from the concurrent calculations can be combined together to form the new state. 