export function testAPI (request) {

  request.checkParams('id', 'Invalid "id" field.').notEmpty()

}