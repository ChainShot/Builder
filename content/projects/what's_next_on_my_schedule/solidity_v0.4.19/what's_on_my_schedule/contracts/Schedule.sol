pragma solidity ^0.4.18;

contract Schedule {
    struct Meeting {
        uint date;
    }

    Meeting[] public meetings;

    /**
     * @notice Takes a list of uint timestamps and uses it to populate the meetings array 
     * @param dates An array of uint timestamps representing the meeting time
     */
    function Schedule(uint[] dates) public {
        for (uint i = 0; i < dates.length; i++) {
            meetings.push(Meeting(dates[i]));
        }
    }

    /**
     * @dev TODO: create this function findNextMeetingDate
     * @notice finds the next meeting and returns the unix timestamp
     * @return uint unix timestamp
     */
}
