pragma solidity ^0.4.19;

contract Contract {
	address public beneficiary;
	
	function Contract() public {
		beneficiary = msg.sender;
	}
}

