import ExtendableError from 'es6-error'

export default class ActionTypeError extends ExtendableError {

  constructor (message, data) {

    super(message)

    this.data = data

  }
}
