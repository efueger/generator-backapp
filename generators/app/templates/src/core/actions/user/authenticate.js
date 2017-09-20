import jwt from 'jsonwebtoken'
import { User } from 'core/models'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from 'config'

authenticate.type = 'USER_AUTH'
export default function authenticate (email, password) {

  return (async function () {
    let user = await User.findOne({ email }).select('+password').exec()
    if (!user) throw new Error('User not exist.')
    const equal = await bcrypt.compare(password, user.password)

    if (!equal) throw new Error('Password not match.')
    user = user.toObject()
    user.token = await createToken(user._id)
    delete user.password

    return user
  })()

}

function createToken (id) {

  return new Promise((resolve, reject) =>
    jwt.sign({ id }, JWT_SECRET, { expiresIn: '1y' }, (e, t) => e ? reject(e) : resolve(t)))

}
