const Voting = artifacts.require('Voting');
const {getAttributes} = require('./util');

contract('Voting', (accounts) => {
    let contract;
    let question = "Does Vote Casting work?";
    let creator = accounts[0];
    before(async () => {
        contract = await Voting.new({ from: creator });
    });

    describe('creating a new vote', () => {
      before(async () => {
        await contract.newVote(question);
      });

      describe('casting three votes', () => {
        let attributes;
        let [voter1, voter2, voter3] = accounts;
        before(async () => {
          try {
            let id = 0;
            await contract.castVote(id, true, { from: voter1 });
            await contract.castVote(id, true, { from: voter2 });
            await contract.castVote(id, false, { from: voter3 });
            attributes = await getAttributes(contract, 'votes', id);
          }
          catch(ex) { console.log(ex) }
        });

        it('should have a yes count of 2', function() {
          assert(attributes.yes, 'Could not find a yes count');
          assert.equal(attributes.yes.toNumber(), 2);
        });

        it('should have a no count of 1', function() {
          assert(attributes.no, 'Could not find a no count');
          assert.equal(attributes.no.toNumber(), 1);
        });
      });
    });
});
