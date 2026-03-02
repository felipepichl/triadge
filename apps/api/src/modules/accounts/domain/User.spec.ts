import { User } from './User'

describe('[Account] - Create a new User', () => {
  it('should be able to create a new instance of user', () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })

    expect(user instanceof User).toBe(true)
    expect(user).toBeTruthy()
  })
})
