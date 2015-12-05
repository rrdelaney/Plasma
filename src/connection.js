var MongoClient = require('mongodb').MongoClient

var dbCache = undefined

exports.connection = function connection (url) {
  return new Promise((resolve, reject) => {
    if (dbCache) {
      resolve(dbCache)
    } else {
      MongoClient.connect(url, function (err, db) {
        if (err) {
          reject(err)
        } else {
          dbCache = db
          resolve(db)
        }
      })
    }
  })
}

exports.shutdown = function shutdown () {
  if (dbCache) {
    dbCache.close()
  }
}
