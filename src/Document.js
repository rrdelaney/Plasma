'use strict'

var MongoClient = require('mongodb').MongoClient

class Document {
  constructor (doc) {
    this.collectionName = this.constructor.name.toLowerCase()
    this.connection = this.constructor.connection
    this._schema = []

    Object.keys(doc).forEach(key => {
      this[key] = doc[key]
      this._schema.push(key)
    })

    return this.initialized = this.connection()
      .then(db => db.collection(this.collectionName))
      .then(col => col.insertOne(doc))
      .then(res => { this._id = res.insertedId; return this })
  }

  save () {
    var updates = {}
    this._schema.forEach(key => updates[key] = this[key])

    return this.connection()
      .then(db => db.collection())
      .then(col => col.updateOne(
        { _id: this._id },
        { $set: updates }
      ))
  }

  static connection () {
    var dbURL = (this.settings || this.constructor.settings).url

    return new Promise((resolve, reject) => {
      if (Document._dbCache) {
        resolve(Document._dbCache)
      } else {
        MongoClient.connect(dbURL, (err, db) => {
          if (err) {
            reject(err)
          } else {
            Document._dbCache = db
            resolve(db)
          }
        })
      }
    })
  }

  static db () {
    return this.connection()
  }

  static collection () {
    return this.db()
      .then(db => db.collection(this.name.toLowerCase()))
  }

  static find (q, mod) {
    return this.collection()
      .then(col =>
        Object.keys(mod || {}).reduce((query, key) =>
          query[key](mod[key])
        , col.find(q || {}))
      )
      .then(results => results.toArray())
      .then(docs => docs.map(doc => {
        Object.keys(doc).forEach(key => doc[key] = { value: doc[key] })
        return Object.create(this.prototype, doc)
      }))
  }

  static close () {
    if (Document._dbCache) {
      Document._dbCache.close()
      Document._dbCache = null
    }
  }
}

module.exports = Document
