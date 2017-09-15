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
   * /test:
   *   get:
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
  .get('/test/:id',
    createValidator(Validators.testAPI),
    createController(Controllers.testAPI)
  )

export default router
