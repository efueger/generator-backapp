/**
 * @swagger
 * <%- URL %>:
 *   put:
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
*      - name: body
 *       description: Body object.
 *       in: body
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           someProperty:
 *             type: string
 */

.put('<%- URL %>'),
createValidator(Validators.<%= VALIDATOR %>),
createController(Controllers.<%= CONTROLLER %>)
)
