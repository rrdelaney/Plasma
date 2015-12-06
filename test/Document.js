'use strict'

var dropDatabase = require('./support/db').dropDatabase
var Document = require('./../src/Document')

var settings = {
  url: 'mongodb://localhost:27017/testdb'
}

class Test extends Document { }
Test.settings = settings

describe('Document', () => {
  before(dropDatabase(settings.url))

  it('should create new documents with the constructor', done => {
    var t = new Test({ test: true })

    return t.initialized
    .then(() => Test.find())
    .then(res => res.toArray())
    .should.eventually.have.length(1)
    .and.have.property(0)
    .that.has.property('test').that.is.true
    .notify(done)
  })

  it('should query documents', done => {
    return Test.find()
    .then(res => res.toArray())
    .should.eventually.have.length(1)
    .and.have.property(0)
    .that.has.property('test').that.is.true
    .notify(done)
  })

  it('should update documents')
})
