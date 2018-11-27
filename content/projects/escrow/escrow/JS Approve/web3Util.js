require('events').EventEmitter.defaultMaxListeners = 0;
const Web3 = require("web3");
const web3 = new Web3();
let _testAccounts;
let publicEtherAccount;
(() => {
  const TestRPC = require("ganache-core");
  const accounts = [].concat([{
    balance: "10000000000000000000", // 10 ether
    secretKey: web3.utils.randomHex(32)
  }, {
    balance: "10000000000000000000", // 10 ether
    secretKey: web3.utils.randomHex(32),
  }, {
    balance: "10000000000000000000", // 10 ether
    secretKey: web3.utils.randomHex(32),
  }])
  const provider = TestRPC.provider({ accounts });
  _testAccounts = accounts.map(({ secretKey }) => web3.eth.accounts.privateKeyToAccount(secretKey));
  // temporary monkeypatch fix until versioning issues are fixed
  // https://github.com/ethereum/web3.js/issues/1038
  provider.constructor.prototype.send = provider.constructor.prototype.sendAsync
  web3.setProvider(provider);
})();

module.exports = {
  web3, _testAccounts
}