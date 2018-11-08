const Voting = artifacts.require('Voting');
const {getAttributes} = require('./util');

function getVoteId(event) {
    const keys = Object.keys(event.args);
    assert.equal(keys.length, 1, `Expecting the ${event.event} event to only have 1 key (the vote id). Found ${keys.length} keys.`)
    return event.args[keys[0]];
}

function findEvent(transaction, evt) {
    return transaction.logs.filter(({event}) => event === evt)[0];
}

async function findTransactionVote(contract, tx, eventName) {
    const event = findEvent(tx, eventName);
    assert(event, `did not broadcast an event called ${eventName}`);
    const voteId = getVoteId(event);
    assert(voteId, 'Should broadcast a voteId');
    let vote;
    try {
        vote = await getAttributes(contract, 'votes', voteId);
    }
    catch (ex) {
        assert.fail(null, ex, `Could not find a vote with id "${voteId}" passed from event "${eventName}"`);
    }
    return vote;
}

contract('Voting', (accounts) => {
    let contract;
    let creator = accounts[0];
    before(async () => {
        contract = await Voting.new({from: creator});
    });

    describe('creating a new vote', () => {
        let originalQuestion = "Did we broadcast an event?";
      
        it('should broadcast a VoteCreated event with a valid voteId', async () => {
            let newVoteTransaction = await contract.newVote(originalQuestion);
            await findTransactionVote(contract, newVoteTransaction, 'VoteCreated');
        });

        describe('casting a vote', () => {
            it('should broadcast a VoteCast event with a valid voteId', async () => {
                let voteCastTransaction = await contract.castVote(0, false, {from: accounts[1]});
                await findTransactionVote(contract, voteCastTransaction, 'VoteCast');
            });
        });

        describe('casting a vote on an older vote', () => {
            it('should broadcast a VoteCast event with the original voteId', async () => {
                await contract.newVote("Will this new question affect the vote?");
                let voteCastTransaction = await contract.castVote(0, false, {from: accounts[1]});
                let vote = await findTransactionVote(contract, voteCastTransaction, 'VoteCast');
                assert.equal(vote.question, originalQuestion, "This should have returned the original vote");
            });
        })
    });
});