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

async function getParentCategoryId(token: string): Promise<string> {
  const response = await request(app)
    .get('/financial-category')
    .set({ Authorization: `Bearer ${token}` })

  const { _id } = response.body.financialCategories[0]

  return _id
}

async function createSubcategory(token: string, parentCategoryId: string) {
  await request(app)
    .post('/financial-category/subcategory')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Subcategory',
      parentCategoryId,
    })
}

describe('[E2E] - List subcategory by category id', () => {
  let token: string
  let parentCategoryId: string

  beforeEach(async () => {
    token = await authenticateUser()

    await createCategoy('Financial Category Test01', token)
    await createCategoy('Financial Category Test02', token)

    parentCategoryId = await getParentCategoryId(token)

    await createSubcategory(token, parentCategoryId)
  })

  it('should be able to list a subcategory by category id', async () => {
    const response = await request(app)
      .get(`/financial-category/subcategory/${parentCategoryId}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.subcategories)).toBe(true)
    expect(response.body.subcategories.length).toBe(1)
  })
})
