import express from 'express'
import useAPI from './api'
import useMiddlewares from './middlewares'

const server = express()

useMiddlewares(server)

useAPI(server)

export default server
