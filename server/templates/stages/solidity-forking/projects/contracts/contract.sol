// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

interface IERC20 {
	function name() external view returns(string memory);
}

contract Contract {
	IERC20 dai = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);

	function getName() external view returns(string memory) {
		return dai.name();
	}
}
