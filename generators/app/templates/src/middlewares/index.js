import useSwagger from './swagger'
import useBodyParser from './bodyParser'
import useExpressValidator from './expressValidator'
import useMorgan from './morgan'
import useJWT from './passport'

/**
 * Connect middlewares to Express app
 */
export default function useMiddlewares (app) {

  useMorgan(app)
  useBodyParser(app)
  useExpressValidator(app)
  useSwagger(app)
  useJWT(app)
}
