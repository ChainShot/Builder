const Hackathon = artifacts.require('Hackathon');

contract('Hackathon', (accounts) => {
  describe('setting participants', () => {
    let contract;
    let numberOfParticipants = 12;

    beforeEach(async () => {
      contract = await Hackathon.new(numberOfParticipants);
    });

    it('should allow us to retrieve those participants', async () => {
      const actual = await contract.participants.call();
      assert.equal(actual.toNumber(), numberOfParticipants);
    });
  });
});
