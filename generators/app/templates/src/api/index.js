import { errorHandler } from './middlewares'
import testModel from './testModel/routes'
import user from './user/routes'

/**
 * Connect endpoints to Express app
 */
export default function useAPI (app) {

  app.use('/api',
    testModel,
    user,

    // Handle errors from endpoints above
    errorHandler
  )

}
