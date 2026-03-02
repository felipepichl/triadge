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

async function createFinancialCategory(token: string): Promise<string> {
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

async function createFixedAccountPaybale(
  financialCategoryId: string,
  token: string,
) {
  await request(app)
    .post('/accounts-payable/fixed')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description Account Payable 1',
      amount: 1000,
      dueDate: new Date(),
      financialCategoryId,
    })

  await request(app)
    .post('/accounts-payable/fixed')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description Account Payable 2',
      amount: 500,
      dueDate: new Date(),
      financialCategoryId,
    })
}

describe('[E2E] - List total spent by financial category to account payable', () => {
  let token: string
  let financialCategoryId: string
  const month = new Date().getMonth() + 1

  beforeEach(async () => {
    token = await authenticateUser()
    financialCategoryId = await createFinancialCategory(token)
    await createFixedAccountPaybale(financialCategoryId, token)
  })

  it('should be able to calculate the total spent by financial category to account payable', async () => {
    const response = await request(app)
      .get('/financial-category/total-spent/fixed/account-payable')
      .set({ Authorization: `Bearer ${token}` })
      .query({ month })

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
          totalSpent: 1500,
        }),
      ]),
    )
  })
})
