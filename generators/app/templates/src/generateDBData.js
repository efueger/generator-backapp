import DB from './core/db'
import log from 'utils/logger'

DB.openConnection()
  .then(() => DB.drop())
  .then(() => DB.generateData())
  .catch(error => log.error(error))
  .then(() => DB.closeConnection())
  .catch(error => log.error(error))
