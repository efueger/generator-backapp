import mongoHost from './mongoHost'

export const HOST = 'localhost'
export const MONGO_DB = process.env.MONGO_DB || 'MyDB'
export const MONGO_HOST = mongoHost
export const MONGO_PORT = process.env.MONGO_PORT
export const MONGO_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.EXPRESS_PORT
export const URL = `${HOST}:${PORT}`
export const JWT_SECRET = 'secret'
