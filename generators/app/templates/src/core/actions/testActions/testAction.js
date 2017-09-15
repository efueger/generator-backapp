import { ExampleError } from 'errors'

testAction.type = 'API_TEST'
export default function testAction (id) {

  if (!id) throw new ExampleError('Missing id!')

  return 'OK'
}
