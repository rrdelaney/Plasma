import { Document } from 'large'

export default class User extends Document {
  static settings = {
    url: 'mongodb://localhost:27017/test'
  };

  constructor (username, password, permissions) {
    super({ _id: username, password, permissions })
  }

  addPermission (name, value) {
    this.permissions[name] = value
    this.save()
  }
}
