const Token = artifacts.require('Token.vyper');

contract('Token', (accounts) => {
  let contract;
  const owner = accounts[0];
  const other = accounts[1];
  const supply = 100;

  beforeEach(async () => {
    contract = await Token.new(supply, { from: owner });
  });

  it('should initialize the deploying address with all of the tokens', async () => {
    assert(contract.balances, "'balances' not available on the contract. Did you make it public?");
    const balance = await contract.balances.call(owner);
    assert.equal(balance.toNumber(), supply);
  });

  it('should initialize another account with nothing', async () => {
    assert(contract.balances, "'balances' not available on the contract. Did you make it public?");
    const balance = await contract.balances.call(other);
    assert.equal(balance.toNumber(), 0);
  });
});
