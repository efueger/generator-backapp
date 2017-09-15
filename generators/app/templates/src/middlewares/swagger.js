import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { URL } from 'config'

const options = {
  swaggerDefinition: {
    info: {
      title: 'Ameen REST API', // required
      version: '1.0.0', // required
      description: 'Documentation of Ameen REST API.'
    },
    host: URL,
    basePath: '/api/'
  },
  apis: ['./src/api/*/routes.js'], // This path should be from root folder
}

const swaggerSpec = swaggerJSDoc(options)

export default function useSwagger (app) {

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

}
