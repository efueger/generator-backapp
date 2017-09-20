import dispatch from 'core/actions'

export async function register (req, res) {
    
  const user = await dispatch('USER_REGISTER', req.body.user)
    
  return res.status(200).json({ user })
    
}

export async function authenticate (req, res) {

  const user = await dispatch('USER_AUTH', req.body.user.email, req.body.user.password)

  return res.status(200).json({ user })

}
