import Boom from 'boom'
import log from 'utils/logger'
/**
 * Handle all errors that coming from endpoints
 */
export default function errorHandler (err, req, res, next) { // eslint-disable-line

  log.error(err)

  if (err && err.toHTTPResponse) {

    const HTTPError = err.toHTTPResponse()

    if (HTTPError.data) HTTPError.output.payload.data = HTTPError.data

    return res.status(HTTPError.output.statusCode).json(HTTPError.output.payload)

  }

  return res.status(500).json(Boom.wrap(err).output.payload)

}
