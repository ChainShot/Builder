const Token = artifacts.require('Token');

contract('Token', (accounts) => {
  let contract;
  const [admin, account1, account2, account3] = accounts;

  beforeEach(async () => {
    contract = await Token.new({ from: admin });
  });

  describe('creating from a non-admin account', () => {
    it('should throw an error', async () => {
      await expectThrow(contract.initialize(account1, 1, { from: account1 }));
    });
  });

  describe('creating a single UTXO', () => {
    it('should log an event', async () => {
      const tx = await contract.initialize(account1, 1, { from: admin });
      const { owner, id, value } = tx.logs.filter(x => x.event === 'NewUTXO')[0].args;
      assert.equal(owner, account1);
      assert.equal(value.toNumber(), 1);
      assert(id);
    });
  });

  describe('having initialized several UTXOs', () => {
    let ids, utxos;
    beforeEach(async () => {
      utxos = [[account1, 1], [account2, 10]];
      ids = await Promise.all(utxos.map(async ([acc, val]) => {
        const tx = await contract.initialize(acc, val, { from: admin });
        const { id } = tx.logs.filter(x => x.event === 'NewUTXO')[0].args;
        return id;
      }));
    });

    describe('spending from the wrong account', () => {
      it('should throw an error', async () => {
        const id = ids[0];
        const address = utxos[1][0];
        const amount = utxos[0][1];
        await expectThrow(contract.spend(id, amount, account3, { from: address }));
      })
    });

    describe('overspending', () => {
      it('should throw an error', async () => {
        const id = ids[0];
        const [address, amount] = utxos[0];
        await expectThrow(contract.spend(id, amount * 2, account3, { from: address }));
      })
    });

    describe('after fully spending the first UTXO', () => {
      const recipient = account2;
      let tx, initialId, address, amount;

      beforeEach(async () => {
        [address, amount] = utxos[0];
        initialId = ids[0];
        tx = await contract.spend(initialId, amount, recipient, { from: address });
      });

      it('should have created a single new UTXO', () => {
        const newUTXOLogs = tx.logs.filter(x => x.event === 'NewUTXO');
        assert.equal(newUTXOLogs.length, 1, "should have created a single UTXO")
        const { owner, id, value } = newUTXOLogs[0].args;
        assert.notEqual(initialId, id, "the new UTXO should have a different ID");
        assert.equal(value.toNumber(), amount);
        assert.equal(owner, recipient);
      });

      describe('spending the following UTXO', () => {
        let tx2;
        const recipient2 = account3;

        beforeEach(async () => {
          const { id } = tx.logs.filter(x => x.event === 'NewUTXO')[0].args;
          tx2 = await contract.spend(id, amount, recipient2, { from: recipient });
        });

        it('should have created another new UTXO', () => {
          const newUTXOLogs = tx2.logs.filter(x => x.event === 'NewUTXO');
          assert.equal(newUTXOLogs.length, 1, "should have created a single UTXO")
          const { owner, id, value } = newUTXOLogs[0].args;
          assert.equal(value.toNumber(), amount);
          assert.equal(owner, recipient2);
        });
      });

      it('should not allow us to double spend', async () => {
        await expectThrow(contract.spend(initialId, amount, recipient, { from: address }));
      });
    });

    describe('after partially spending half the second UTXO', () => {
      const recipient = account1;
      let tx, initialId, address, amount;

      beforeEach(async () => {
        [address, amount] = utxos[1];
        initialId = ids[1];
        tx = await contract.spend(initialId, amount / 2, recipient, { from: address });
      });

      it('should have created two new UTXOs', () => {
        const newUTXOLogs = tx.logs.filter(x => x.event === 'NewUTXO');
        assert.equal(newUTXOLogs.length, 2);
        const toRecipient = newUTXOLogs.filter(x => x.args.owner === recipient)[0];
        assert(toRecipient, "Should have created a UTXO with the recipient as the owner");
        assert(toRecipient.args.value, amount / 2);
        const toSender = newUTXOLogs.filter(x => x.args.owner === address)[0];
        assert(toSender, "Should have created a UTXO with the sender as the owner");
        assert(toSender.args.value, amount / 2);
      });

      it('should allow us to spend the other half', async () => {
        const newId = tx.logs.filter(x => x.event === 'NewUTXO' && x.args.owner === address)[0].args.id;
        const nextTx = await contract.spend(newId, amount / 2, recipient, { from: address });
        const { owner, id, value } = nextTx.logs.filter(x => x.event === 'NewUTXO')[0].args;
        assert.equal(owner, recipient);
        assert.equal(value, amount / 2);
        assert.notEqual(initialId, id);
      });

      it('should not allow us to spend the initial full amount', async () => {
        await expectThrow(contract.spend(initialId, amount, recipient, { from: address }));
      });
    });
  });
});


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
