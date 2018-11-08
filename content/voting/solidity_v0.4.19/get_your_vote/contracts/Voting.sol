pragma solidity ^0.4.18;

contract Voting {
    address public owner;
    address[] public voters;
    mapping(address => uint) public votes;
    uint public numberVotes = 0;

    function Voting() public {
        owner = msg.sender;
        // numberVotes = 0;
    }

    function register(address _voterAddress) public {
        require(msg.sender == owner);
        voters.push(_voterAddress);
    }

    function vote(bool _vote) public {
        bool isVoter = false;
        for(uint i = 0; i < voters.length; i++) {
            if (voters[i] == msg.sender) {
                isVoter = true;
            }
        }
        require(isVoter);

        if (_vote) {
            votes[msg.sender] = 1;
        } else {
            votes[msg.sender] = 2;
        }

        numberVotes += 1;
    }

    function myVote() public view returns(int) {
        if (votes[msg.sender] == 1) {
            return 1;
        }

        if (votes[msg.sender] == 2) {
            return 0;
        }

        if (votes[msg.sender] == 0) {
            return -1;
        }
        return 0;
    }

}
