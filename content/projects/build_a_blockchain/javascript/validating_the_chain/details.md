## Blockchain Consensus

When a blockchain is running in a peer to peer network, we'll need to introduce something to slow down the network long enough to be able to come to a consensus. For Proof Of Work, this concept is difficulty, or a configurable variable that will change how hard it is to come up with an acceptable hash for a particular block. 

In PoW miners will need to guess at the block hash using considerable amounts of computing power until they come up with an acceptable hash. Each node in the network accept the longest blockchain as the source of truth, so long as that blockchain is valid. We can check to make sure a blockchain is valid by checking to see that all the hashes and previous hashes are properly calculated. 