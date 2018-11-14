const Hackathon = artifacts.require('Hackathon');

contract('Hackathon', (accounts) => {
  describe('entering one by one', () => {
    let contract;
    let numberOfParticipants = 5;

    beforeEach(async () => {
      contract = await Hackathon.new();
      for(let i = 0; i < accounts.length; i++) {
        await contract.enter.sendTransaction({ from: accounts[i] });
      }
    });

    it('should allow us to lookup the length of participants', async () => {
      const actual = await contract.numberOfParticipants.call();
      assert.equal(actual.toNumber(), accounts.length);
    });
  });
});
