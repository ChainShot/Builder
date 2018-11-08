const Token = artifacts.require('Token.vyper');

contract('Token', (accounts) => {
  let contract;

  beforeEach(async () => {
    contract = await Token.new(100);
  });

  it('should have a symbol', async () => {
    assert(contract.symbol, "'symbol' not available on the contract. Did you make it public?");
    const symbol = await contract.symbol.call();
    assert.match(hex2a(symbol), /^[A-Z]{1,5}$/);
  });

  it('should have a name', async () => {
    assert(contract.name, "'name' not available on the contract. Did you make it public?");
    const name = await contract.name.call();
    assert(hex2a(name).length > 0, "The token name length should be greater than zero");
  });
});

function hex2a(x) {
  return Buffer.from(x.slice(2), 'hex').toString();
}
