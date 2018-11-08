pragma solidity ^0.4.18;

contract Hackathon {
  struct Project {
    string title;
    uint[] ratings;
  }
  Project[] projects;
  
  // TODO: add the findWinner function
  
  function newProject(string _title) public {
    // creates a new project with a title and an empty ratings array
    projects.push(Project(_title, new uint[](0)));
  }

  function rate(uint _idx, uint _rating) public {
    // rates a project by its index
    projects[_idx].ratings.push(_rating);
  }
}
