import ExtendableError from 'es6-error'
import Boom from 'boom'

export default class ExampleError extends ExtendableError {

  constructor (data) {

    super(message)

    this.data = data

  }


  toHTTPResponse () {

    return Boom.badImplementation(this.message, this.data)

  }

}
