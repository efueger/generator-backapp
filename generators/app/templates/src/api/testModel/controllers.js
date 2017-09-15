import dispatch from 'core/actions'

export async function testAPI (req, res) {

  const answer = await dispatch('API_TEST', req.params.id)

  return res.status(200).json({ answer })

}
