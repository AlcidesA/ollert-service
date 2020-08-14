import { User } from '@models/User'

test('it should be ok', () => {
  const user = new User()

  user.name = 'Alcides'

  expect(user.name).toEqual('Alcides')
})
