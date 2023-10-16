import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

describe('[E2E] = Authenticate User', () => {
  beforeAll(async () => {
    await request(app).post('/users').send({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })
  })

  it('should be able to authenticate an user', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'johndue@example.com',
      password: 'hash123',
    })

    expect(responseToken.status).toBe(200)
    expect(responseToken.body).toHaveProperty('token')
    expect(responseToken.body).toHaveProperty('refreshToken')
  })
})
