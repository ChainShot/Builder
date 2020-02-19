const {assert} = require('chai');
const index = require('../index');

describe('index', () => {
    it('should return index', () => {
        const x = null;
        const result = index(x);
        assert.equal(result, x);
    })
})