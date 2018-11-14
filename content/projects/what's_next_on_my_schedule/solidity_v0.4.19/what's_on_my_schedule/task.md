## Next Meeting Date

Setup for you is a smart contract `Schedule` that can be initialized with an array of `meetings` which each contain a property `date` stored as a timestamp in [Unix Time](?tab=details&scroll=Block%20Timestamp). 

Your task is to create a new function `findNextMeetingDate` which returns the nearest meeting date that hasn't already passed as a `uint` timestamp. 

If there are no future meetings, simply return `0`.