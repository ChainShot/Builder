import stateUpdate from '../stateUpdate';
const assert = require('chai').assert;
import { mock } from '../mockData';

let vote0 = { 
  id: 0,
  yes: 1, no: 2, 
  creator: '0xee8ccf6c57e407f91af9ceea101e8416b166ecc1', 
  question: 'Elect me?'
}
let vote1 = { 
  id: 1,
  yes: 1, no: 2, 
  creator: '0xee8ccf6c57e407f91af9ceea101e8416b166ecc1', 
  question: 'Can I be mayor?'
}

describe('stateUpdate', function() {
  describe('for an unknown event', () => {
    it('should do nothing', async () => {
      let event = 'Unknown';
      let returnValues = [1];
      let actual = await stateUpdate({ votes: [vote0] }, { event, returnValues });
      assert(actual, 'Did not receive anything from the async stateUpdate function');
      assert.equal(actual.votes.length, 1, "Should do nothing to votes");
    })
  });
  
  describe('for a VoteCreated event', () => {
  	before(() => mock({ votes: [vote1] }));
    it('should add a new vote', async () => {
      let event = 'VoteCreated';
      let returnValues = [1];
      let actual = await stateUpdate({ votes: [vote0] }, { event, returnValues });
      assert(actual, 'Did not receive anything from the async stateUpdate function');
      assert.equal(actual.votes.length, 2, "should add the new vote");
    })
  
    describe('with an null state', () => {
      it('should handle a new vote', async () => {
        let event = 'VoteCreated';
        let returnValues = [1];
        let actual = await stateUpdate(null, { event, returnValues });
	    assert(actual, 'Did not receive anything from the async stateUpdate function');
        assert.equal(actual.votes.length, 1, "should add the new vote");
      })
    })
  })
  
  describe('for a VoteCast event', () => {
    let updatedVote0;
  	before(() => {
      updatedVote0 = { ...vote0, yes: vote0.yes + 1 };;
      mock({ votes: [updatedVote0] })
    });
    
    it('should load the updated vote', async () => {
      let event = 'VoteCast';
      let returnValues = [0];
      let actual = await stateUpdate({ votes: [vote0] }, { event, returnValues });
      assert.equal(actual.votes.length, 1, "should only have one vote");
      assert.equal(actual.votes[0].yes, updatedVote0.yes, "it should update the yes votes");
    });
  })
})