import Generator from './index'
import log from 'utils/logger'

export default async function generate () {

  await generateUsers(10)
  log.info('Added 10 users.')

  log.info('Finish.')

}

async function generateUsers (count = 10) {

  const users = []

  for (let i = 0; i < count; i++) {
    users.push(await Generator.newUser())
  }

  return users

}
