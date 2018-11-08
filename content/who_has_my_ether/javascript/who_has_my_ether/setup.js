const Web3 = require('web3');
const web3 = new Web3();
let _testAccounts;
let publicEtherAccount;
(() => {
  const TestRPC = require("ganache-core");
  const publicEtherProps = {
    balance: "100000000000000000000", // 100 ether
    secretKey: web3.utils.randomHex(32)
  };
  const accounts = [].concat([{ 
    balance: "10000000000000000000", // 10 ether
    secretKey: web3.utils.randomHex(32)
  }, {
    balance: "100000000000000000000", // 100 ether
    secretKey: web3.utils.randomHex(32),
  }])
  const provider = TestRPC.provider({ accounts: accounts.concat(publicEtherProps) });
  _testAccounts = accounts.map(({ secretKey }) => web3.eth.accounts.privateKeyToAccount(secretKey));
  publicEtherAccount = web3.eth.accounts.privateKeyToAccount(publicEtherProps.secretKey)
  // temporary monkeypatch fix until versioning issues are fixed
  // https://github.com/ethereum/web3.js/issues/1038
  provider.constructor.prototype.send = provider.constructor.prototype.sendAsync
  web3.setProvider(provider);
})();

const GAS = 2000000;
const CHAIN_ID = 10; // at least until this is cleared up: https://github.com/ethereum/web3.js/issues/932
const Q = require('q');
const newAddress = () => web3.eth.accounts.create().address;
const accountAddressesSentTo = {}
function signTransaction(account, value, index) {
  return web3.eth.getTransactionCount(account.address).then(count => {
    const nonce = count + index;
    const to = newAddress();
    accountAddressesSentTo[account.address] = (accountAddressesSentTo[account.address] || []).concat(to);
    return account.signTransaction({ to, value, gas: GAS, chainId: CHAIN_ID, nonce })
  });
}
function sendTransaction(tx) {
  return web3.eth.sendSignedTransaction(tx.rawTransaction).catch(console.log)
}
function providerAsyncCall(method) {
  let deferred = Q.defer();
  web3.currentProvider.sendAsync({ jsonrpc: "2.0", method }, deferred.resolve);
  return deferred.promise;
}
function runTransactions(account, transactionLists) {
  return transactionLists.reduce((promise, list) => {
    return promise.then(() => {
      return providerAsyncCall('miner_stop')
        .then(() => Q.all(list.map((v,i) => signTransaction(account, v, i))))
        .then((transactions) => { 
          let sendPromise = Q.all(transactions.map(sendTransaction));
          // need to set timeout to process send queue
          // not entirely sure what the underlying mechanism is
          // but this is necessary for proper execution
          setTimeout(() => providerAsyncCall('miner_start')); 
          return sendPromise;
        })
    });
  }, Q());
}
const accountTransactionLists = [
[ // blocks for account 0
  [ "5000000000000000000" ], // block 0
  [ "2500000000000000000" ], // block 1
  [ "1000000000000000000" ], // block 2
],
[ // blocks for account 1
  [ "50000000000000000000", "30000000000000000000", "1000000000000000000" ], // block 0
  [ "1000000000000000000", ], // block 1
]
];
   
const buildAccountTransactions = () => {
  return _testAccounts.reduce((promise, account, index) => {
    return promise.then(() => runTransactions(account, accountTransactionLists[index]))
  }, Q());
}

const isFunction = (fn) => typeof fn === 'function'
const isPromiseLike = (obj) => obj && obj.then && isFunction(obj.then);

export { 
  _testAccounts,
  buildAccountTransactions,
  accountAddressesSentTo,
  isFunction,
  isPromiseLike,
  newAddress,
  web3,
}