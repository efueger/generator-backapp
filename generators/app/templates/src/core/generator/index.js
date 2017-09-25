import { User } from 'core/models'
import faker from 'faker'
import bcrypt from 'bcrypt'

export default class Generator {

  static get User () { return User }

  static async newUser (override = {}) {
    const user = {
      isVerified: faker.random.boolean(),
      phone: faker.phone.phoneNumber(),
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('qwerty123', bcrypt.genSaltSync(4))
    }
    if (override.password) override.password = bcrypt.hashSync(override.password, bcrypt.genSaltSync(4))
    const object = Object.assign({}, user, override)

    return User.create(user)
  }

}