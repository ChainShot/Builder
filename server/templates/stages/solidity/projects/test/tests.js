const { assert } = require("chai");
describe('Contract', function () {
    let contract;
    beforeEach(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should create variable a: true', async () => {
        const a = await contract.a.call();
        assert.equal(a, true);
    });
});
