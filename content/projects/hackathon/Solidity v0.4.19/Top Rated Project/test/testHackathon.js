const Hackathon = artifacts.require('Hackathon');

contract('Hackathon', (accounts) => {
  describe('with a single project', () => {
    let contract;
    const projectName = 'Only';

    beforeEach(async () => {
      contract = await Hackathon.new();
      await contract.newProject(projectName)
    });

    it('should award the sole participant', async () => {
      const winner = await contract.findWinner.call();
      assert.equal(winner, projectName);
    });
  });
  describe('with multiple projects', () => {
    describe('and a single judge', () => {
      let contract;
      const expectedWinner = 'Winning';
      const participant1 = 'First';
      const participant2 = 'Second';

      beforeEach(async () => {
        contract = await Hackathon.new();
        await contract.newProject(participant1);
        await contract.newProject(expectedWinner);
        await contract.newProject(participant2);
        await contract.rate(0, 4);
        await contract.rate(1, 5);
        await contract.rate(2, 2);
      });

      it('should award the highest rated', async () => {
        const actualWinner = await contract.findWinner.call();
        assert.equal(actualWinner, expectedWinner);
      });
    });
    describe('and multiple judges', () => {
      let contract;
      const expectedWinner = 'Winning';
      const participant1 = 'First';
      const participant2 = 'Second';

      beforeEach(async () => {
        contract = await Hackathon.new();
        const projects = [
          [participant1, [2,2,2,2,2,2]],
          [participant2, [0,4]],
          [expectedWinner, [2,3,4]],
        ]
        await Promise.all(projects.map(async ([title, ratings], idx) => {
          await contract.newProject(title);
          await Promise.all(ratings.map(async (r) => await contract.rate(idx, r)));
        }));
      });

      it('should award the highest average', async () => {
        const actualWinner = await contract.findWinner.call();
        assert.equal(actualWinner, expectedWinner);
      });
    });
  });
});
