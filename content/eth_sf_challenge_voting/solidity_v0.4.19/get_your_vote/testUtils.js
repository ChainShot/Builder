async function expectNoThrow(promise) {
    let exception;
    try {
      await promise;
    }
    catch(ex) {
      exception = ex;
    }
    assert(!exception, 'An unexpected exception occured');
}

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

module.exports = { expectThrow, expectNoThrow }
