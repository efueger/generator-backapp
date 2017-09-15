import mongoose from 'mongoose'
mongoose.Promise = global.Promise
import randomstring from 'randomstring'
import { MONGO_HOST, MONGO_PORT, MONGO_DB } from '../../config'

export default class DB {

  static openConnection () {

    return mongoose.connect(mockDBConnectionString(MONGO_HOST, MONGO_PORT), { useMongoClient: false })

  }

  static closeConnection () {

    return new Promise((resolve, reject) =>
      mongoose.connection.close(e => e ? reject(e) : resolve()))

  }

  static drop () {

    return new Promise((resolve, reject) =>
      mongoose.connection.dropDatabase(e => e ? reject(e) : resolve()))

  }

}

function mockDBConnectionString (IP, PORT) {

  return `mongodb://${IP}:${PORT}/${mockDBName()}`

}

function mockDBName () {

  return MONGO_DB.concat(randomstring.generate())

}
