const Voting = artifacts.require('Voting');
const {getAttributes} = require('./util');

contract('Voting', (accounts) => {
    let question = "Should we hard fork?";
    let creator = accounts[0];

    before(async () => {
        let contract = await Voting.new({ from: creator });
        await contract.newVote(question);
        try { vote = await getAttributes(contract, 'votes', 0) }
        catch(ex) { console.log('Vote not found') }
    });

    it('should store the creator', async () => {
      assert(vote, 'Vote not found');
      assert.equal(vote.creator, creator);
    });

    it('should store the question', async () => {
      assert(vote, 'Vote not found');
      assert.equal(vote.question, question);
    });
});
