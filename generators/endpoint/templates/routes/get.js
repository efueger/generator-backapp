/**
 * @swagger
 * <%- URL %>:
 *   get:
 *     tags:
 *     - <%= SWAGGER_TAG %>
 *     description: <%= SWAGGER_DESCRIPTION %>
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK.
 *     parameters:
 *     - name: id
 *       type: string
 *       description: id
 *       in: path
 */

.get('<%- URL %>'),
createValidator(Validators.<%= VALIDATOR %>),
createController(Controllers.<%= CONTROLLER %>)
)
