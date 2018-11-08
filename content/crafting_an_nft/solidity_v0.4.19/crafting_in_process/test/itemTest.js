const Marketplace = artifacts.require('Marketplace');

contract('Marketplace', (accounts) => {
    const owner = accounts[0];
    const beneficiary = accounts[1];
    const trader = accounts[3];
    const sword = 'sword';
    const dagger = 'dagger';
    describe('Creating an Item', () => {
        let contract;
        let id;
        beforeEach(async () => {
            contract = await Marketplace.new({from: owner})
            id = await contract.itemId.call();
        })

        it('should create an item and send to an address', async() => {
            await contract.createItem(sword, 10, beneficiary, {from: owner})
            await contract.createItem(dagger, 5, beneficiary, {from: owner})
            const balance = await contract.balanceOf(beneficiary);

            assert.equal(balance.toNumber(), 2);
        })

        it('should store created item in a list of items', async() => {
            await contract.createItem(sword, 10, beneficiary, {from: owner})
            await contract.createItem(dagger, 5, beneficiary, {from: owner})
            const item = await contract.gameItems.call(id.toNumber());

            assert.equal(sword, item[0]);
        })

        it('should only allow the owner of the contract to create items', async() => {
            await expectThrow(
                contract.createItem(sword, 10, owner, {from: beneficiary})
            )
        })

        it("Item ID's must be consistent across all contract mappings", async () => {
            await contract.createItem(sword, 10, beneficiary, {from: owner})
            const address = await contract.ownerOf.call(id.toNumber());
            const item = await contract.gameItems.call(id.toNumber());

            assert.equal(sword, item[0]);
            assert.equal(address, beneficiary);
        })
    })

    describe('Trading an Item', async () => {
        let contract;
        let id;
        beforeEach(async () => {
            contract = await Marketplace.new({from: owner})
            id = await contract.itemId.call();
            await contract.createItem(sword, 10, beneficiary, {from: owner})
        })

        it('should only allow the owner of the NFT to trade', async () => {
            await expectThrow(
                contract.tradeItem(id, trader, {from: owner})
            )
        })

        it('should transfer an NFT to a new owner', async () => {
            await contract.tradeItem(id, trader, {from: beneficiary})
            id = await contract.itemId.call();
            await contract.createItem(dagger, 5, beneficiary, {from: owner})
            await contract.tradeItem(id.toNumber(), trader, {from: beneficiary})
            const balance = await contract.balanceOf(trader);
            assert.equal(balance.toNumber(), 2)
        })
    })
})

async function expectThrow(promise) {
    const errMsg = 'Expected throw not received';
    try {
        await promise;
    } catch (err) {
        assert(err.toString().includes('revert'), errMsg);
        return;
    }

    assert(false, errMsg);
}
