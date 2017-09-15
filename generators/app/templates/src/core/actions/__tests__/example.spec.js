import DB from 'core/db'
import dispatch from '../'

jest.mock('core/db')

beforeAll(async () => await DB.openConnection())

afterEach(async () => { try {await DB.drop();} catch (e) {console.log('Error:', e)}; })

afterAll(async () => await DB.closeConnection())

test('test:should test API endpoint', async () => {

  const result = await dispatch('API_TEST', 'someID')

  expect(result).toBe('OK')
})
