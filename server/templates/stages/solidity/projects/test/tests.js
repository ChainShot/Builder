const Contract = artifacts.require('Contract');
contract('Contract', function (accounts) {
    let contract;
    before(async () => {
        contract = await Contract.new({
            from: accounts[0]
        });
    });

    it('should create variable a: true', async () => {
        const a = await contract.a.call();
        assert.equal(a, true);
    });
});