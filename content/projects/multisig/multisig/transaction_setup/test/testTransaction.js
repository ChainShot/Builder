const MultiSig = artifacts.require('MultiSig');
const errors = [
    "Make sure to declare a public uint for the transaction count!",
    "Make sure to declare a public mapping for the transactions!",
    "Make sure to declare a public uint for the confirmations!",
]

contract('MultiSig', function(accounts) {
    describe('Transaction Tests', function() {      
        it('should define the transaction count', async function() {
	        const transactionCount = MultiSig.abi.filter(x => x.name === 'transactionCount')[0];
            assert(transactionCount, errors[0]);
          	assert.deepEqual(transactionCount.outputs.map(x => x.type), ['uint256']);
        });

        it('should define a transactions mapping', async function() {
	        const transactions = MultiSig.abi.filter(x => x.name === 'transactions')[0];
          	assert(transactions, errors[1]);
            assert.deepEqual(transactions.inputs.map(x => x.type), ['uint256']);
			assert.deepEqual(transactions.outputs.map(x => x.type), ['address', 'uint256', 'bool']);
        });

        it('should define a confirmations mapping', async function() {
	        const confirmations = MultiSig.abi.filter(x => x.name === 'confirmations')[0];
          	assert(confirmations, errors[2]);
            assert.deepEqual(confirmations.inputs.map(x => x.type), ['uint256', 'address']);
			assert.deepEqual(confirmations.outputs.map(x => x.type), ['bool']);
        });
    })
});