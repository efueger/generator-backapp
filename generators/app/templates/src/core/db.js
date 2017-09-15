import mongoose from 'mongoose'
import { MONGO_URL } from 'config'

// Use native promises for mongoose
mongoose.Promise = global.Promise

export default class DB {

  static openConnection () {

    return mongodbOpenConnection(MONGO_URL)

  }

  static closeConnection () {

    return mongodbCloseConnection()

  }

  static drop () {

    return mongoose.connection.db.dropDatabase()

  }

  static feed () {

    return feedDB()

  }

}

function mongodbOpenConnection (mongourl) {

  return mongoose.connect(mongourl, { useMongoClient: true })

}

function mongodbCloseConnection () {

  return new Promise((resolve, reject) => {
    mongoose.connection.close(error => error ? reject(error) : resolve())
  })

}
