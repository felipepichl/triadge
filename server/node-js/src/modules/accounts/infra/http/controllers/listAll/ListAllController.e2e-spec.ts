import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

async function createUser(
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
): Promise<void> {
  await request(app).post('/users').send({
    name,
    email,
    password,
    phoneNumber,
  })
}

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

describe('[E2E] = List all Users', () => {
  beforeAll(async () => {
    await createUser(
      'User First',
      'user1@example.com',
      'hash123',
      '51999999999',
    )

    await createUser(
      'User Second',
      'user2@example.com',
      'hash123',
      '51999999999',
    )

    await createUser(
      'User Third',
      'user3@example.com',
      'hash123',
      '51999999999',
    )
  })

  it('should be able to list all users', async () => {
    const token = await authenticateUser()

    const response = await request(app)
      .get('/users')
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.users)).toBe(true)
    expect(response.body.users.length).toBe(4)
  })
})
