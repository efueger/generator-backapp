import { Router } from 'express'
import * as Controllers from './controllers'
import * as Validators from './validators'
import * as Middlewares from '../middlewares'
import createValidator from '../utils/createValidator'
import createController from '../utils/createController'

const router = new Router()

router
  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *     - Test
   *     description: Test API.
   *     responses:
   *       200:
   *         description: OK.
   *     parameters:
   *     - name: id
   *       description: Just ID.
   *       in: path
   *       type: string
   *       required: true
   *       default: 'SomeID'
   */
  .post('/users',
  createValidator(Validators.register),
  createController(Controllers.register)
)

/**
   * @swagger
   * /users/auth:
   *   post:
   *     tags:
   *     - Test
   *     description: Test API.
   *     responses:
   *       200:
   *         description: OK.
   *     parameters:
   *     - name: id
   *       description: Just ID.
   *       in: path
   *       type: string
   *       required: true
   *       default: 'SomeID'
   */
  .post('/users/auth',
  // createValidator(Validators.authenticate),
  createController(Controllers.authenticate)
)

export default router
