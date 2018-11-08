const Hackathon = artifacts.require('Hackathon');

contract('Hackathon', (accounts) => {
  describe('assigning a judge to a team with a project', () => {
    let contract;
    let teamName = 'Fun Team';
    let projectName = 'New Project';
    let judge = accounts[4];

    beforeEach(async () => {
      contract = await Hackathon.new();
      await contract.register(teamName);
      await contract.join(0);
      await contract.submitProject(0, projectName);
      await contract.assignJudge(judge, 0);
    });

    it('should allow us to lookup our project name', async () => {
      const actual = await contract.projectByJudge.call(judge);
      assert.equal(actual, projectName);
    });
  });
});
