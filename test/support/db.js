var MongoClient = require('mongodb').MongoClient

exports.dropDatabase = function dropDatabase (url) {
  return function (done) {
    var db = null
    MongoClient.connect(url)
    .then(_db => { db = _db })
    .then(() => db.dropDatabase())
    .then(() => db.close())
    .then(done)
  }
}
