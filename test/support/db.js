var MongoClient = require('mongodb').MongoClient

exports.dropDatabase = function dropDatabase (url) {
  return function (done) {
    MongoClient.connect(url, (err, db) => {
      db.dropDatabase(done)
    })
  }
}
