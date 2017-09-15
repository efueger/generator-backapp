export function <%= VALIDATOR %> (request) {

  request.checkQuery('query', 'Invalid "query" parameter.').notEmpty()
  request.checkParams('id', 'Invalid "id" param.').notEmpty()
  request.checkBody('property', '"property" field is invalid.').notEmpty()
    
}
