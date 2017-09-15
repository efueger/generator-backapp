import bodyParser from 'body-parser'

export default function useBodyParser (app) {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))

}
