const Contract = artifacts.require('Contract');
contract('Contract', function (accounts) {
    let contract;
    const sender = accounts[0];
    beforeEach(async () => {
        contract = await Contract.new({
            from: sender
        });
    });

    it('should set the beneficiary address', async () => {
        const beneficiary = await contract.beneficiary.call();
        assert.equal(beneficiary, sender);
    });
});