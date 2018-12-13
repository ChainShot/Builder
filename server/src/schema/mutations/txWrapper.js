const Transaction = require('./Transaction');
const projectHelpers = require('../../projectHelpers');
const ioHelpers = require('../../ioHelpers');

function txWrapper(setupFn) {
  return async (...args) => {
    const transaction = new Transaction();
    const mutationFn = setupFn(ioHelpers.withTransaction(transaction), projectHelpers);
    try {
      return await mutationFn(...args);
    }
    catch(ex) {
      console.log(ex);
      if(transaction.stack.length > 0) {
        console.log(`Reverting transaction stack: ${transaction.stack.length} io operations.`);
        await transaction.revert();
      }
      throw(ex);
    }
  }
}

module.exports = txWrapper;
