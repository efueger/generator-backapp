import user from './user'

import { ActionTypeError } from 'errors'

export const actions = Object.assign({}, user)

export default function dispatch (actionType, ...args) {

  const action = actions[actionType]

  if (!action) throw new ActionTypeError(actionType)

  return action(...args)

}
