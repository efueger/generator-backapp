import morgan from 'morgan'

export default function useMorgan (app) {

  app.use(morgan('combined'))

}

