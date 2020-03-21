const Contract = artifacts.require('Contract');
contract('Contract', function ([owner]) {
    let contract;
    before(async () => {
        contract = await Contract.new({ from: owner });
    });

    it('should create variable a: true', async () => {
        const a = await contract.a.call();
        assert.equal(a, true);
    });
});
