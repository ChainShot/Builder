const TreasureChest = artifacts.require('TreasureChest');
const ERC20 = artifacts.require('EIP20');

contract('TreasureChest', (accounts) => {
  describe('storing erc20 tokens', () => {
    let GLD;
    let POO;
    let chest;
    const coinCreator = accounts[0];
    const hunter = accounts[1];

    beforeEach(async () => {
      GLD = await ERC20.new(10000, 'GOLD', 1, 'GLD', { from: coinCreator });
      POO = await ERC20.new(10000, 'SHITCOIN', 1, 'POO', { from: coinCreator });
      chest = await TreasureChest.new();
    })

    describe('storing some GLD', () => {
      beforeEach(async() => {
        await GLD.transfer(chest.address, 1000, { from: coinCreator });
      })

      it('should let us store GLD at the address', async () => {
        const balance = await GLD.balanceOf(chest.address);
        assert.strictEqual(balance.toString(), '1000');
      })

      describe('upon withdrawal', () => {
        beforeEach(async () => {
          await chest.withdraw([GLD.address], { from: hunter });
        });

        it('should award the hunter the balance', async () => {
          const hunterBalance = await GLD.balanceOf(hunter);
          assert.strictEqual(hunterBalance.toString(), '1000');
        });

        it('should remove the balance from the chest', async () => {
          const balance = await GLD.balanceOf(chest.address);
          assert.strictEqual(balance.toString(), '0');
        });
      });
    });

    describe('storing some GLD and POO', () => {
      beforeEach(async() => {
        await GLD.transfer(chest.address, 250, { from: coinCreator });
        await POO.transfer(chest.address, 300, { from: coinCreator });
      })

      it('should let us store GLD at the address', async () => {
        const balance = await GLD.balanceOf(chest.address);
        assert.strictEqual(balance.toString(), '250');
      })

      it('should let us store POO at the address', async () => {
        const balance = await POO.balanceOf(chest.address);
        assert.strictEqual(balance.toString(), '300');
      })

      describe('upon withdrawal of POO', () => {
        beforeEach(async () => {
          await chest.withdraw([POO.address], { from: hunter });
        });

        it('should not award the hunter the GLD', async () => {
          const hunterBalance = await GLD.balanceOf(hunter);
          assert.strictEqual(hunterBalance.toString(), '0');
        });

        it('should award the hunter the POO', async () => {
          const hunterBalance = await POO.balanceOf(hunter);
          assert.strictEqual(hunterBalance.toString(), '300');
        });

        it('should not remove the GLD from the chest', async () => {
          const balance = await GLD.balanceOf(chest.address);
          assert.strictEqual(balance.toString(), '250');
        });

        it('should remove the POO from the chest', async () => {
          const balance = await POO.balanceOf(chest.address);
          assert.strictEqual(balance.toString(), '0');
        });
      });

      describe('upon withdrawal of both', () => {
        beforeEach(async () => {
          await chest.withdraw([GLD.address, POO.address], { from: hunter });
        });

        it('should award the hunter the GLD', async () => {
          const hunterBalance = await GLD.balanceOf(hunter);
          assert.strictEqual(hunterBalance.toString(), '250');
        });

        it('should award the hunter the POO', async () => {
          const hunterBalance = await POO.balanceOf(hunter);
          assert.strictEqual(hunterBalance.toString(), '300');
        });

        it('should remove the GLD from the chest', async () => {
          const balance = await GLD.balanceOf(chest.address);
          assert.strictEqual(balance.toString(), '0');
        });

        it('should remove the POO from the chest', async () => {
          const balance = await POO.balanceOf(chest.address);
          assert.strictEqual(balance.toString(), '0');
        });
      });
    });
  })
});
