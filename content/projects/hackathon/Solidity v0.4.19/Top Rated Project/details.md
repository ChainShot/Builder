## Contract Setup

The `Hackathon.sol` contract is partially setup. We have the `Project` struct: 

```
struct Project {
    string title;
    uint[] ratings;
}
```

It stores the `title` of the project and an array of unsigned integer ratings. The higher the integer, the higher the rating. For the purposes of this challenge, the project with the highest average rating is the winner. 

We can always look up the projects using the `projects` array, which is populated through the `newProject` function. This function takes a string and uses that to initialize the project's `title`. It also initializes the project's ratings to an empty uint array.

Finally we have a `rate` function which allows us to rate a particular project. It does this by taking an index to identify a project and a rating to be push on the projects ratings array.  