import Boom from 'boom'
import HTTPResponseError from './httpResponse'

export default class ValidationRequestError extends HTTPResponseError {
  constructor (data) {

    super('Validation Error')

    this.data = data

  }


  toHTTPResponse () {

    return Boom.badRequest(this.message, this.data)

  }
}
