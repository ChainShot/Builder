const Countdown = artifacts.require('Countdown.vyper');

contract('Countdown', (accounts) => {
  describe('for a countdown of 5', function() {
    let contract;
    beforeEach(async () => {
      contract = await Countdown.new(5);
    });

    describe('after four calls', function() {
      beforeEach(async () => {
        for(let i = 0; i < 4; i++) {
          await contract.tick();
        }
      });

      it('should not self-destruct for one more', async () => {
        let exception;
        try {
          await contract.tick();
        }
        catch(ex) {
          exception = ex;
        }
        if(exception) console.log(exception);
        assert(!exception, "Received an exception after an unexpected amount of calls");
      });

      describe('after the fifth call', function() {
        beforeEach(async () => {
          await contract.tick();
        });

        it('should self-destruct', async () => {
          let exception;
          try {
              const actual = await contract.tick();
          }
          catch(ex) {
            exception = ex;
          }
          assert(exception, "Expected the contract to be self destructed");
          assert(exception.toString().indexOf("is not a contract address") > -1, "Expected an exception due to lack of a contract");
        });
      });
    });
  });

  describe('for a countdown of 10', function() {
    let contract;
    let value = 100;
    beforeEach(async () => {
      contract = await Countdown.new(10, { value });
    });

    describe('after 10 calls', async () => {
      beforeEach(async () => {
        for(let i = 0; i < 10; i++) {
          await contract.tick();
        }
      });

      it('should self-destruct', async () => {
        let exception;
        try {
            const actual = await contract.tick();
        }
        catch(ex) {
          exception = ex;
        }
        assert(exception, "Expected the contract to be self destructed");
        assert(exception.toString().indexOf("is not a contract address") > -1, "Expected an exception due to lack of a contract");
      });
    });

    describe('after 9 calls', async () => {
      beforeEach(async () => {
        for(let i = 0; i < 9; i++) {
          await contract.tick();
        }
      });

      for(let i = 0; i < 5; i++) {
        describe('for a random 10th caller', async () => {
          let before;
          let gasUsed;
          const account = sample(accounts);

          beforeEach(async () => {
            before = web3.eth.getBalance(account);
            const {receipt} = (await contract.tick({ from: account }));
            const BigNumber = before.constructor;
            gasUsed = new BigNumber(receipt.gasUsed).times(1e11);
          });

          it('should award the value', async () => {
              let expected = -value;
              let after = web3.eth.getBalance(account);
              assert.equal(expected, before.minus(gasUsed).minus(after).toNumber());
          });
        });
      }
    });
  });
});

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}
