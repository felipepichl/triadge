import { app } from '@shared/infra/http/start/app'
import { PrismaSingleton } from '@shared/infra/prisma'
import { hash } from 'bcrypt'
import request from 'supertest'

async function createUser(): Promise<string> {
  await PrismaSingleton.getInstance().user.create({
    data: {
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: await hash('hash123', 8),
      phoneNumber: '51999999999',
    },
  })

  const result = await PrismaSingleton.getInstance().user.findUnique({
    where: { email: 'johndue@example.com' },
  })

  const { id } = result

  return id
}

async function createStockAndPosition(userId: string) {
  await PrismaSingleton.getInstance().stock.create({
    data: {
      shortName: 'short name',
      symbol: 'SYMB11',
      price: 7,
      date: new Date(),
      quantity: 10,
      type: 'stock',
      userId,
    },
  })

  await PrismaSingleton.getInstance().stockPosition.create({
    data: {
      symbol: 'SYMB11',
      quantity: 10,
      type: 'stock',
      avgPrice: 10,
      userId,
    },
  })
}

async function authenticateUser(): Promise<string> {
  const response = await request(app).post('/sessions').send({
    email: 'johndue@example.com',
    password: 'hash123',
  })

  const { token } = response.body
  return token
}

describe('[E2E] - Sell stocks', () => {
  let token: string

  beforeEach(async () => {
    const userId = await createUser()
    await createStockAndPosition(userId)

    token = await authenticateUser()
  })

  it('should be to sell stocks', async () => {
    const response = await request(app)
      .post('/stocks/sell')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        symbol: 'SYMB11',
        price: 5,
        quantity: 2,
        type: 'stock',
      })

    expect(response.status).toBe(201)
  })
})
