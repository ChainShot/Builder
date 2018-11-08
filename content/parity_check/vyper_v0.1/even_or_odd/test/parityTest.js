const Parity = artifacts.require('Parity.vyper');
const { toHex } = web3;
const {
  emptyArray,
  pad64,
  zeroesArray,
  generateEven,
  generateOdd,
  assertEvent,
  assertNotEvent,
} = require('./testUtils');

contract('Parity', () => {
  let contract;
  const evenNumbers = zeroesArray(5).map(generateEven).map(x => x.toString());
  const oddNumbers = zeroesArray(5).map(generateOdd).map(x => x.toString());

  beforeEach(async () => {
    contract = await Parity.new();
  });

  it('should include a check function which takes a bytes32 argument', () => {
    const checkFunction = Parity.abi.filter(x => x.name === 'check')[0];
    assert(checkFunction, "Did not create a function called check!")
    const input = checkFunction.inputs[0];
    assert(input, 'Did not add an argument to the check function!')
    assert.equal(input.type, 'bytes32');
  });

  describe('even numbers', () => {
    evenNumbers.forEach(x => {
      it(`should detect ${x} is even`, async () => {
        const bytes32 = '0x' + pad64(toHex(x).slice(2));
        const tx = await contract.check(bytes32);
        assertEvent(tx, 'Even');
        assertNotEvent(tx, 'Odd');
      });
    });
  });

  describe('odd numbers', () => {
    oddNumbers.forEach(x => {
      it(`should detect ${x} is odd`, async () => {
        const bytes32 = '0x' + pad64(toHex(x).slice(2));
        const tx = await contract.check(bytes32);
        assertEvent(tx, 'Odd');
        assertNotEvent(tx, 'Even');
      });
    });
  });
});
