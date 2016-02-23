import { Document } from 'large'
import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

export default class User extends Document {
  static settings = {
    url: 'mongodb://localhost:27017/test'
  };
  
  login (password) {
    return new Promise(resolve => {
      bcrypt.compare(password, this.password, (err, res) => {
        if (res) {
          this.token = '1'
          this.save().then(() => resolve(res))
        } else {
          resolve(res)
        }
      })
    })
  }

  constructor (username, password, permissions) {
    let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
    let hash = bcrypt.hashSync(password, salt)
    super({ _id: username, password: hash, permissions })
  }

  addPermission (name, value) {
    this.permissions[name] = value
    this.save()
  }
}
