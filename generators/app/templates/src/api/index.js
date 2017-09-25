import { errorHandler } from './middlewares'
import user from './user/routes'

/**
 * Connect endpoints to Express app
 */
export default function useAPI (app) {

  app.use('/api',
    user,

    // Handle errors from endpoints above
    errorHandler
  )

}
