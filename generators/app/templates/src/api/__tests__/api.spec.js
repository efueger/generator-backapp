import request from 'supertest'
import server from 'server'
import DB from 'core/db'

jest.mock('core/db')

beforeAll(async () => await DB.openConnection())

afterEach(async () => { try {await DB.drop();} catch (e) {console.log('de:',e)}; })

afterAll(async () => await DB.closeConnection())

test('GET /api/test', async  () => {
  const res = await request(server)
    .get('/api/test/someID')
    .send()

  expect(res.status).toBe(200)
})

test('POST /api/users', async  () => {
  const res = await request(server)
    .post('/api/users')
    .send({ user: {
      email: 'email@dot.com',
      password: 'password',
      name: 'name',
      surname: 'surname'
    }})

  expect(res.status).toBe(200)
  expect(res.body.user).toBeDefined()
})

test('POST /api/users/auth', async  () => {
  const register = await request(server)
  .post('/api/users')
  .send({ user: {
    email: 'email@dot.com',
    password: 'password',
    name: 'name',
    surname: 'surname'
  }})

  const res = await request(server)
    .post('/api/users/auth')
    .send({ user: {
      email: 'email@dot.com',
      password: 'password'
    }})

  expect(res.status).toBe(200)
  expect(res.body.user).toBeDefined()
})
