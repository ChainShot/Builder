## Integrating Aragon OS

Yes! Now it's time to add in [Aragon OS](?tab=details&scroll=Aragon%20OS) for governance and upgradeability. We'll need to take four steps in order to do this:

1. [Import](?tab=details&scroll=Imports) AragonApp 
    * The path to the solidity file is: `@aragon/os/contracts/apps/AragonApp.sol` 
2. [Inherit](?tab=details&scroll=Inheritance) from AragonApp
    * The `Voting` Contract should derive from `AragonApp`
3. Add [two new Aragon Roles](?tab=details&scroll=Roles)
    * Create the `CREATE_VOTES_ROLE`  
    * Create the `CAST_VOTES_ROLE`
4. Setup [authentication](?tab=details&scroll=Auth) for the two functions
    * Authenticate `CREATE_VOTES_ROLE` on `newVote`
    * Authenticate `CAST_VOTES_ROLE` on `castVote`