import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

async function authenticateUser() {
  await request(app).post('/users').send({
    name: 'Jonh Due',
    email: 'johndue@example.com',
    password: 'hash123',
    phoneNumber: '51999999999',
  })

  const response = await request(app).post('/sessions').send({
    email: 'johndue@example.com',
    password: 'hash123',
  })
  const { token } = response.body
  return token
}

describe('[E2E] = Create a partial User', () => {
  let token: string
  beforeAll(async () => {
    token = await authenticateUser()
  })

  it('should be able to create a new partial user', async () => {
    const response = await request(app)
      .post('/users/partial')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: 'User First',
        phoneNumber: '51969696969',
      })

    expect(response.status).toBe(201)
  })
})
