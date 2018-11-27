## Storing a Previous Hash

It's interesting that each block only stores a hash that references the previous block and it's data (by virtue of the hash). This is different from your typical LinkedList data structure which generally uses pointers that link towards the next block (it can point both ways in some cases). 

More importantly, the fact that the reference is a `hash` is a crucial aspect that gives Blockchain it's unique characteristics. This will become more apparent in the the following two stages.