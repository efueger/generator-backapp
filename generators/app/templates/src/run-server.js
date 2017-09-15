import { NODE_ENV, PORT } from 'config'
import log from 'utils/logger'
import DB from './core/db'

function startServer () {

  return new Promise((resolve, reject) =>
    require('./server').default.listen(PORT, err => err ? reject(err) : resolve()))

}

DB.openConnection()
  .then(() => startServer())
  .then(() => log.info(`Server listening on ${PORT} port in ${NODE_ENV} mode.`))
  .catch(error => log.error(error, 'Failed to start server!'))
