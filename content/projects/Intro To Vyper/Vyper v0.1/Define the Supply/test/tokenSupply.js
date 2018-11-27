const Token = artifacts.require('Token.vyper');

contract('Token', (accounts) => {
  [500,10000,20000].forEach((_supply) => {
    describe(`a supply of ${_supply}`, () => {
      let contract;

      beforeEach(async () => {
        contract = await Token.new(_supply);
      });

      it(`should have a supply of ${_supply}`, async () => {
          assert(contract.supply, "'supply' not available on the contract. Did you make it public?");
          const supply = await contract.supply.call();
          assert.equal(_supply, supply);
      });
    });
  });
});
