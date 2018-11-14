## Housekeeping

At this point the core of our Mulit-Sig wallet is complete! Below we clean-up our code to better the flow of adding, confirming, and executing a transaction.

1. Invoke `executeTransaction` within `confirmTransaction`

Once the multi-sig has been confirmed by enough owners to meet the requirement, invoke the execution. This saves the owner from having to manually invoke the execution.

2. Change `addTransaction` function visibility from `public` to `internal`

An `internal` function can only be called from within a Solidity contract. Since we built a `submitTransaction` function to handle the creation and confirmation of a `Transaction` we no longer have the need for `addTransaction` to be called externally.