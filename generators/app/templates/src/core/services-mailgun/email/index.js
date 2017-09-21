import makeEmail from './makeEmail'
import { ArgumentNullError } from 'errors'

const emails = {
  'Verification' : data => createEmail(data),
  'RestorePassword' : data => createEmail(data),
}

export default function sendEmail (name, data) {

  if (!name) throw new ArgumentNullError('sendEmail:name')
  if (!data) throw new ArgumentNullError('sendEmail:data')

  return emails[name](data)

}
