const { assert } = require("chai");
describe('Contract', function () {
    let contract;
    beforeEach(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should get the dai name', async () => {
        const name = await contract.getName();
        assert.equal(name, "Dai Stablecoin");
    });
});
