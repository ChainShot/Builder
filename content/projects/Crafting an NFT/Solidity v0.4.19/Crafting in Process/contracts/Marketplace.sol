pragma solidity ^0.4.18;

contract Marketplace {
    address public owner;
    uint256 public itemId = 1;

    struct GameItem {
        string name;
        uint256 attackPower;
    }

    function Marketplace() public {

    }

    function createItem(string _name, uint256 _attackPower, address _to) public {

    }

    function tradeItem(uint256 _itemId, address _to) public {

    }
}