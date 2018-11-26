## Search for the Top Rated Project

Hey there! As you can see the `Hackathon.sol` contract is [partially setup](?tab=details&scroll=Contract%20Setup) already. 

To complete this challenge we need to write a function that will help us find the winning project of the hackathon. The winning project will be determined by the **average score** of all of its ratings. 

### Find Winner Function

Your task is to create the function `findWinner`. 

It should use the public member array of `projects` and determine the project that has the highest average rating amongst its array of `ratings`. 

Upon finding the highest average, it should return the projects `title`. 