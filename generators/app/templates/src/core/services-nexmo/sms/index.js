import makeSms from './makeSms'
import { ArgumentNullError } from 'errors'

const messages = {
  'Verification' : data => createSms(data),
}

export default function sendSms (name, data) {

  if (!name) throw new ArgumentNullError('sendSms:name')
  if (!data) throw new ArgumentNullError('sendSms:data')

  return messages[name](data)

}
