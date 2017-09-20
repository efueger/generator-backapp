import jwt from 'jsonwebtoken'
import { User } from 'core/models'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from 'config'

register.type = 'USER_REGISTER'
export default function register (userObject = {}) {
  const { email, password, name, surname } = userObject

  return hash(password).then(hashed => User.create({ email, name, surname, password: hashed }))
}

function hash (password) {

  return bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt))
}
