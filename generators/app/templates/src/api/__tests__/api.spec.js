import request from 'supertest'
import server from 'server'

test('GET /api/test', async  () => {
  const res = await request(server)
    .get('/api/test/someID')
    .send()

  expect(res.status).toBe(200)
})
