import ExtendableError from 'es6-error'
import Boom from 'boom'

export default class HTTPResponseError extends ExtendableError {
  constructor (message, data) {

    super(message)

    this.data = data

  }


  toHTTPResponse () {

    return Boom.badImplementation(this.message, this.data)

  }
}
