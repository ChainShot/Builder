import loadVote from '../loadVote';
import {mock} from '../mockData';

const assert = require('chai').assert;

describe('loadVote', function () {
	let vote0 = {
		id: 0, yes: 1, no: 2,
		creator: '0xee8ccf6c57e407f91af9ceea101e8416b166ecc1',
		question: 'Elect me?'
	}
	let vote1 = {
		id: 1, yes: 1, no: 2,
		creator: '0xee8ccf6c57e407f91af9ceea101e8416b166ecc1',
		question: 'Can I be mayor?'
	}
	let votes = [vote0, vote1];
	before(() => mock({votes}));
	votes.forEach((vote, idx) => {
		it(`should load vote #${idx}`, (done) => {
			loadVote(idx).subscribe((actualVote) => {
              	assert(actualVote, 'Did not find a vote. Did you return an object from the map function?');
				assert.strictEqual(actualVote.yes, vote.yes, 'Should return the vote yes count');
				assert.strictEqual(actualVote.no, vote.no, 'Should return the vote no count');
				assert.equal(actualVote.creator, vote.creator, 'Should return the vote creator');
				assert.equal(actualVote.question, vote.question, 'Should return the vote question');
				assert.equal(actualVote.id, idx, 'Should return the id');
				done();
			});
		});
	});
})