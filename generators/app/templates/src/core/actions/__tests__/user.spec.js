import DB from 'core/db'
import dispatch from '../'

jest.mock('core/db')

beforeAll(async () => await DB.openConnection())

afterEach(async () => { try {await DB.drop();} catch (e) {console.log('Error:', e)}; })

afterAll(async () => await DB.closeConnection())

test('register:should register a user', async () => {
  const userObject = { 
    email: 'email@dot.com',
    password: 'password',
    name: 'name',
    surname: 'surname'
   }
  const user = await dispatch('USER_REGISTER', userObject)

  expect(user.email).toBe('email@dot.com')
  expect(user.name).toBe('name')
  expect(user.surname).toBe('surname')
})

test('authenticate:should authenticate existed user and return token', async () => {
  // Register
  const userObject = { 
    email: 'email@dot.com',
    password: 'password',
    name: 'name',
    surname: 'surname'
   }
  const user = await dispatch('USER_REGISTER', userObject)
  // Then authenticate
  const authUser = await dispatch('USER_AUTH', 'email@dot.com', 'password')

  expect(authUser.name).toBe('name')
  expect(authUser.surname).toBe('surname')
  expect(authUser.token).toBeDefined()
})
