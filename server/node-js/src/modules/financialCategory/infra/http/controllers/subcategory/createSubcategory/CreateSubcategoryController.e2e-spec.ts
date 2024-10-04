import { app } from '@shared/infra/http/start/app'
import request from 'supertest'

async function authenticateUser(): Promise<string> {
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

async function createCategoy(description: string, token: string) {
  await request(app)
    .post('/financial-category')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description,
    })
}

async function getParentCategoryId(token: string) {
  const response = await request(app)
    .get('/financial-category')
    .set({ Authorization: `Bearer ${token}` })

  // const {} = response.body.financialCategories

  console.log(JSON.stringify(response.body.financialCategories, null, 2))
}

describe('[E2E] - Create subcategory to financial category', () => {
  let token: string

  beforeEach(async () => {
    token = await authenticateUser()

    await createCategoy('Financial Category Test01', token)
    await createCategoy('Financial Category Test02', token)

    await getParentCategoryId(token)
  })

  it('should be to create a new subcategory to financial category', async () => {
    const response = await request(app)
      .post('/financial-category')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        description: 'Financial Category Description',
      })

    // expect(response.status).toBe(201)
  })
})
