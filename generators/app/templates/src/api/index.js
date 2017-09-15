import { errorHandler } from './middlewares'
import testModel from './testModel/routes'

/**
 * Connect endpoints to Express app
 */
export default function useAPI (app) {

  app.use('/api',
    testModel,

    // Handle errors from endpoints above
    errorHandler
  )

}
