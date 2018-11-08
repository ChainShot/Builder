const Hackathon = artifacts.require('Hackathon');

contract('Hackathon', (accounts) => {
  describe('registering and joining a team', () => {
    let contract;
    let teamName = 'Fun Team';

    beforeEach(async () => {
      contract = await Hackathon.new();
      await contract.register(teamName);
      await contract.join(0);
    });

    it('should allow us to lookup the team name', async () => {
      const actual = await contract.getMyTeamName.call();
      assert.equal(actual, teamName);
    });
  });
});
