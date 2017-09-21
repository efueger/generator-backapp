import Nexmo from 'nexmo'
import { NEXMO_KEY, NEXMO_SECRET, NEXMO_FROM } from 'config'
import { ArgumentNullError } from 'errors'

const nexmo = new Nexmo({
  apiKey: NEXMO_KEY,
  apiSecret: NEXMO_SECRET,
}, { debug: true })

export default function createSms (text) {

  if (!text) throw new ArgumentNullError('createSms:text')

  return function sendNexmoMessage (recipient) {

    if (!recipient) throw new ArgumentNullError('sendNexmoSms:recipient')

    return new Promise((resolve, reject) =>
      nexmo.message.sendSms(NEXMO_FROM, recipient, text, (e, r) => e ? reject(e) : resolve(r)))
  }

}
