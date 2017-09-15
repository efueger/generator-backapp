import { Router } from 'express'
import * as Controllers from './controllers'
import * as Validators from './validators'
import * as Middlewares from '../middlewares'
import createValidator from '../utils/createValidator'
import createController from '../utils/createController'

const router = new Router()

router
