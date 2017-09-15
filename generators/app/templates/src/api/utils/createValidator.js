import { ValidationRequestError } from 'errors'

export default function createValidator (validator) {

  return function (req, res, next) {
    validator(req)

    req.getValidationResult().then(result => {
      if (!result.isEmpty()) {
        return next(new ValidationRequestError(result.array()))
      }

      next()
    })
  }

}
