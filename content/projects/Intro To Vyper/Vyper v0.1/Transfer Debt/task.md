## Wait a minute.

What happens if someone tries to send **tokens they don't have**? Does your current `transfer` function handle this case?

It might, actually.

Remember one of Vyper's goals is **Security**. Vyper wants to make it extra hard for you to write insecure code. For that reason you cannot [underflow](?tab=details&scroll=Integer%20Underflow) or overflow a number. 

Let's consider the case where we have two unsigned integers and we subtract the larger one from the smaller one:

```
a: uint256
b: uint256
c: uint256

@public
def setValues():
  self.a = 5
  self.b = 10
  self.c = self.a - self.b
```

In this case `a` is smaller than `b` and both are unsigned integers. Since the subtraction would result in a number below the unsigned integer range, 
this transaction will revert every time. None of the state transitions within the transaction will be persisted.

We've set up the test cases so one account tries to transfer tokens it doesn't have to another account. Go ahead and test if your code handles this case!