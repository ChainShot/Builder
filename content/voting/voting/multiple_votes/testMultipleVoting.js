const Voting = artifacts.require('Voting');
const { getAttributes } = require('./util');

contract('Voting', (accounts) => {
    let contract;
    let creator = accounts[0];
    before(async () => {
        contract = await Voting.new({ from: creator });
    });

    describe('creating a new vote', () => {
        before(async () => {
            await contract.newVote("Can people vote twice?");
        });

        describe('casting four votes: three from the same address', () => {
            let attributes;
            let voter1 = accounts[1];
            let voter2 = accounts[2];
            before(async () => {
                try {
                    let id = 0;
                    await contract.castVote(id, false, { from: voter1 });
                    await contract.castVote(id, true, { from: voter1 });
                    await contract.castVote(id, true, { from: voter1 });
                    await contract.castVote(id, false, { from: voter2 });
		            attributes = await getAttributes(contract, 'votes', id);
                }
                catch(ex) {
                    console.log(ex);
                }
            });

            it('should have a yes count of 1', function () {
                assert(attributes.yes, 'Could not find the yes count');
                assert.equal(attributes.yes.toNumber(), 1);
            });

            it('should have a no count of 1', function () {
                assert(attributes.no, 'Could not find the no count');
                assert.equal(attributes.no.toNumber(), 1);
            });

            describe('creating a newer vote', function () {
                let attributes2;
                before(async () => {
                    await contract.newVote("Can people vote across different votes?");
                });

                describe('voting as the first voter', function () {
                    before(async () => {
                        try {
                            let id = 1;
                            await contract.castVote(id, true, { from: voter1 });
                            attributes2 = await getAttributes(contract, 'votes', id);
                        }
                        catch(ex) { console.log(ex) }
                    });

                    it('should have a yes count of 1', function () {
                        assert(attributes2.yes, 'Could not find the yes count');
                        assert.equal(attributes2.yes.toNumber(), 1);
                    });
                });
            });
        });
    });
});
