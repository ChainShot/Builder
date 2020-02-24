pragma solidity ^0.6.2;

contract Contract {
	bool public a = true;

	function add(uint x, uint y) public pure returns(uint) {
		return x + y;
	}
}