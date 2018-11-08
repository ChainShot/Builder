const BananaStand = artifacts.require('BananaStand');

contract('BananaStand', (accounts) => {
    describe('adding more bananas', () => {
      let contract;

      beforeEach(async () => {
        contract = await BananaStand.new();
      });

      it('should start with zero bananas', async () => {
        let currentBananas = +(await contract.bananas.call());
        assert.equal(currentBananas, 0);
      });

      it('should allow us to add some bananas', async () => {
        await contract.addBananas(5);
        await contract.addBananas(50);
        await contract.addBananas(200);
        let currentBananas = +(await contract.bananas.call());
        assert.equal(currentBananas, 255);
      });

      it('should not allow us to add too many bananas', async () => {
        await contract.addBananas(255);
        await allowRevert(contract.addBananas(1));
        let currentBananas = +(await contract.bananas.call());
        assert.equal(currentBananas, 255, 'Banana Overflow!');
      });
    });

    describe('removing bananas', () => {
      let contract;

      beforeEach(async () => {
        contract = await BananaStand.new();
      });

      it('should allow us to add and remove bananas', async () => {
        await contract.addBananas(50);
        await contract.removeBananas(37);
        let currentBananas = +(await contract.bananas.call());
        assert.equal(currentBananas, 13);
      });

      it('should allow us to add and remove all bananas', async () => {
        await contract.addBananas(24);
        await contract.removeBananas(24);
        let currentBananas = +(await contract.bananas.call());
        assert.equal(currentBananas, 0);
      });

      it('should not allow us to remove more than the total bananas', async () => {
        await contract.addBananas(10);
        await allowRevert(contract.removeBananas(20));
        let currentBananas = +(await contract.bananas.call());
        assert.equal(currentBananas, 10, 'Banana Underflow!');
      });
    });
});


async function allowRevert(promise) {
    try {
        await promise;
    } catch (err) {
        let containsRevert = err.toString().includes('revert');
        if(!containsRevert) {
          assert(false, "Unexpected error thrown");
          console.log(err);
        }
        return;
    }
}
