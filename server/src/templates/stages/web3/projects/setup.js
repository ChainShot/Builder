const Web3 = require('web3');
const Ganache = require("ganache-core");
const web3 = new Web3();

// create some test accounts for the stage
let _testAccounts;
const accounts = [].concat([{ 
  balance: "10000000000000000000", // 10 ether
  secretKey: web3.utils.randomHex(32)
}, {
  balance: "100000000000000000000", // 100 ether
  secretKey: web3.utils.randomHex(32),
}])

const provider = Ganache.provider({ accounts });
_testAccounts = accounts.map(({ secretKey }) => web3.eth.accounts.privateKeyToAccount(secretKey));

// temporary monkeypatch fix until versioning issues are fixed
// https://github.com/ethereum/web3.js/issues/1038
provider.constructor.prototype.send = provider.constructor.prototype.sendAsync;
web3.setProvider(provider);

export { 
  _testAccounts,
  web3,
}