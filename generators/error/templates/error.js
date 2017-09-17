import HTTPResponseError from './httpResponse'
import Boom from 'boom'

export default class <%= ERROR %> extends HTTPResponseError {

  constructor (data) {

    super(message)

    this.data = data

  }


  toHTTPResponse () {

    return Boom.badRequest(this.message, this.data)

  }

}
