## Require Statement

Let me ask you a question. On that last stage did you make sure that nobody else but the `arbiter` can call your `approve` function?  

If you did, kudos to you! 

If not, we certainly don't want the `beneficiary` to be transfer the funds without approval! Let's add a [Require Statement](?tab=details)

1. Ensure that if the `approve` function is called by anyone other than the `arbiter`, it will throw an exception and stop execution. 