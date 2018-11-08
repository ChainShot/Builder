const emptyArray = len => new Array(len)
const pad64 = x => emptyArray(65 - x.length).join("0") + x
const zeroesArray = x => emptyArray(x).join("0").split("0")
const generateEven = () => Math.floor(Math.random() * 100000) * 2
const generateOdd = () => generateEven() + 1
const assertEvent = (tx, evt) => assert(tx.logs.filter(({event}) => event === evt)[0], `Event '${evt}' should have been emitted!`);
const assertNotEvent = (tx, evt) => assert(!tx.logs.filter(({event}) => event === evt)[0], `Event '${evt}' should not have been emitted!`);

module.exports = {
  emptyArray,
  pad64,
  zeroesArray,
  generateEven,
  generateOdd,
  assertEvent,
  assertNotEvent,
}
