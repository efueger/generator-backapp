test('<%= METHOD.toUpperCase() %> /api<%= URL %>', async () => {
  const res = await request(server)
    .<%= METHOD %>('/api<%= URL %>')
    .send()
  
  expect(res.status).toBe(200)
})
