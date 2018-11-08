const Hackathon = artifacts.require('Hackathon');

contract('Hackathon', (accounts) => {
  describe('registering a team with a project', () => {
    let contract;
    let teamName = 'Fun Team';
    let projectName = 'New Project';

    beforeEach(async () => {
      contract = await Hackathon.new();
      await contract.register(teamName);
      await contract.join(0);
      await contract.submitProject(0, projectName);
    });

    it('should allow us to lookup our project name', async () => {
      const actual = await contract.getMyProject.call();
      assert.equal(actual, projectName);
    });
  });
});

async function expectThrow(promise) {
    const errMsg = 'Expected throw not received';
    try {
        await promise;
    } catch (err) {
        assert(err.toString().includes('revert'), errMsg);
        return;
    }

    assert(false, errMsg);
}