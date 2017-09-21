import Mailgun from 'mailgun-js'
import { MAILGUN_KEY, MAILGUN_DOMAIN, MAILGUN_FROM } from 'config'
import { ArgumentNullError } from 'errors'

const mailgun = Mailgun({
  apiKey: MAILGUN_KEY,
  domain: MAILGUN_DOMAIN,
})

export default function createEmail (data) {

  if (!data) throw new ArgumentNullError('createEmail:data')

  const mail = convertToMailgunFormat(data)

  return function sendMailgunEmail (recipient) {

    if (!recipient) throw new ArgumentNullError('sendMailgunEmail:recipient')

    mail.to = recipient

    return new Promise((resolve, reject) => mailgun.messages().send(mail, (e, m) => e ? reject(e) : resolve(m)))

  }

}

function convertToMailgunFormat (data) {

  return {
    from: MAILGUN_FROM,
    subject: data.subject,
    text: data.text
  }

}
