import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../core/models'
import { JWT_SECRET } from 'config'

export default function useJWT (app) {

  passport.use(jwtStrategy())
  app.use(passport.initialize())

}

function jwtStrategy () {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: JWT_SECRET,
  }

return new Strategy(options, (payload, next) => {
   User.findById(payload.id).exec()
   .then(user => next(null, user ? Object.assign({}, user.toObject()) : null))
  })
}