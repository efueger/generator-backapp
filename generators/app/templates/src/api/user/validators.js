export function register (request) {

    request.checkBody('user.name', 'Field "user.name" is empty.').notEmpty()
    request.checkBody('user.email', 'Field "user.email" is empty.').notEmpty()
    request.checkBody('user.surname', 'Field "user.surname" is empty.').notEmpty()
    request.checkBody('user.password', 'Field "user.password" is empty.').notEmpty()

}

export function authenticate (request) {

    request.checkBody('user.email', 'Field "user.email" is empty.').notEmpty()
    request.checkBody('user.password', 'Field "user.password" is empty.').notEmpty()

}