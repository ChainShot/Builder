## Function Signature

In Vyper a public function signature with multiple arguments looks something like this:

```
@public
def multiple(something: uint256, person: address): 
    # your code
```

## Update a Mapping

Remember, to update a mapping you can use the `key` and then set the `value` like so:

```
myMapping[key] = value
```

## Local Variables

Local variables can be created inside of the function body like so:

```
@public
def myFunction(something: uint256): 
    something_else: uint256
    something_else = something + 5
```