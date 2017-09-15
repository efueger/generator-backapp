import expressValidator from 'express-validator'
import mongoose from 'mongoose'

export default function useExpressValidator (app) {

  app.use(expressValidator( validators ))

}

const validators = {
  customValidators: {
    isArray: (value) => {
      return Array.isArray(value)
    },
    isObjectId: id => mongoose.Types.ObjectId.isValid(id)
  }
}
