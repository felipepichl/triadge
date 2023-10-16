import { resolve } from 'node:path'
import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

describe('[E2E] = Update user avatar', () => {
  beforeEach(async () => {
    await request(app).post('/users').send({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })
  })

  it('should be able to update an user avatar', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'johndue@example.com',
      password: 'hash123',
    })

    const { token } = responseToken.body

    const getParentPath = (level: number, ...args: string[]) =>
      resolve(__dirname, ...new Array(level).fill('..'), ...args)

    const avatarPath = getParentPath(7, 'temp', 'avatar', 'test', 'avatar.jpeg')

    const response = await request(app)
      .patch('/users/avatar')
      .attach('avatar', avatarPath)
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(204)
  })
})
