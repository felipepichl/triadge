import { UserTokens } from './UserTokens'

describe('[Account] - Create a new UserTokens', () => {
  it('should be able to create a new instance of userTokens', () => {
    const userTokens = UserTokens.createUserTokens({
      userId: 'userId',
      expiresDate: new Date(),
      refreshToken: 'refreshToken',
    })

    expect(userTokens instanceof UserTokens).toBe(true)
    expect(userTokens).toBeTruthy()
    expect(userTokens.userId).toBe('userId')
  })
})
