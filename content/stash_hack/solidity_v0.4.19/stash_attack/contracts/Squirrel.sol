pragma solidity ^0.4.19;

contract Stash {
  function addToBalance() public payable;
  function withdrawBalance() public payable;
}

contract Squirrel {
    Stash stash;

    function Squirrel(address _stashAddress) public {
        stash = Stash(_stashAddress);
    }

    function() public payable { }

    function deposit() public payable {
        stash.addToBalance.value(this.balance)();
    }

    function withdraw() public {
        stash.withdrawBalance();
    }
}
