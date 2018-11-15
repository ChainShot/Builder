const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'dapplyn';

const connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true  }, function(err, client) {
      if(err) reject(err);
      else resolve({
        client,
        db: client.db(dbName)
      });
    });
  });
}

module.exports = { connect }
