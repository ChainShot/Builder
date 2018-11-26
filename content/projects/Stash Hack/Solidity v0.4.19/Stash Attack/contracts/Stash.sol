pragma solidity ^0.4.19;

contract Stash {
    mapping(address => uint) public balances;

    function addToBalance() public payable {
        balances[msg.sender] = balances[msg.sender] + msg.value;
    }

    function withdrawBalance() public {
        uint amountToWithdraw = balances[msg.sender];
        if(!msg.sender.call.value(amountToWithdraw)()) {
            revert();
        }
        balances[msg.sender] = 0;
    }
}
