import DB from 'core/db'
import dispatch from '../'

test('test:should test API endpoint', async () => {

  const result = await dispatch('API_TEST', 'someID')

  expect(result).toBe('OK')
})
