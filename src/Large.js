'use strict'

var _connection = require('./connection')
var connection = _connection.connection
var shutdown = _connection.shutdown

class Document {
  constructor (doc, _schema) {
    this.collectionName = this.constructor.name.toLowerCase()
    this.dbURL = this.constructor.settings.url
    this._schema = _schema || []

    if (doc) {
      Object.keys(doc).forEach(key => {
        this[key] = doc[key]
        this._schema.push(key)
      })

      this.initialized = connection(this.dbURL)
        .then(db => db.collection(this.collectionName))
        .then(col => col.insertOne(doc))
        .then(res => this._id = res.insertedId)
    }
  }

  save () {
    var updates = {}
    this._schema.forEach(key => updates[key] = this[key])

    return connection(this.dbURL)
      .then(db => db.collection(this.collectionName))
      .then(col => col.updateOne(
        { _id: this._id },
        { $set: updates }
      ))
  }

  static db () {
    return connection(this.settings.url)
  }

  static collection () {
    return this.db()
      .then(db => db.collection(this.name.toLowerCase()))
  }

  static find (q) {
    return this.collection()
      .then(col => col.find(q || {}))
  }

  static close () {
    shutdown()
  }
}

exports.Document = Document
