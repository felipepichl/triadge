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

async function createFinancialCategoy(token: string): Promise<string> {
  await request(app)
    .post('/financial-category')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Category Test 1',
    })

  const response = await request(app)
    .get('/financial-category')
    .set({ Authorization: `Bearer ${token}` })

  const { _id } = response.body.financialCategories[0]

  return _id
}

async function createTransaction(financialCategoryId: string, token: string) {
  await request(app)
    .post('/transactions')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description 1',
      detail: 'Detail',
      type: 'income',
      value: 100,
      financialCategoryId,
    })

  await request(app)
    .post('/transactions')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description 2',
      detail: 'Detail',
      type: 'outcome',
      value: 50,
      financialCategoryId,
    })

  await request(app)
    .post('/transactions')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description 3',
      detail: 'Detail',
      type: 'outcome',
      value: 50,
      financialCategoryId,
    })
}

describe('[E2E] - List total spent by financial category', () => {
  let token: string
  let financialCategoryId: string
  const type = 'outcome'
  const month = new Date().getMonth() + 1

  beforeEach(async () => {
    token = await authenticateUser()
    financialCategoryId = await createFinancialCategoy(token)
    await createTransaction(financialCategoryId, token)
  })

  it('should be able to calculate the total spent by financial category', async () => {
    const response = await request(app)
      .get('/financial-category/total-spent')
      .set({ Authorization: `Bearer ${token}` })
      .query({ month, type })

    expect(response.status).toBe(200)
    expect(response.body.totalExpensesByFinancialCategory).toHaveLength(1)
    expect(response.body.totalExpensesByFinancialCategory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          financialCategory: expect.objectContaining({
            props: expect.objectContaining({
              description: 'Category Test 1',
            }),
          }),
          totalSpent: 100,
        }),
      ]),
    )
  })
})
