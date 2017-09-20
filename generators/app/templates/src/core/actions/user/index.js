import authenticate from './authenticate'
import register from './register'

export default {
    [authenticate.type]: authenticate,
    [register.type]: register,
  }