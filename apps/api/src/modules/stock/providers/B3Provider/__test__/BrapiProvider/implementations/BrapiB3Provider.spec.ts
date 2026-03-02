// import { jest } from '@jest/globals'

import { AppError } from '@shared/error/AppError'

import { BrapiB3Provider } from '../../../implementations/BrapiB3Provider'
import { brapi } from '../../../services/brapi'

jest.mock('../../../services/brapi')

let brapiProvider: BrapiB3Provider

describe('[BrAPI] - Get Quote Tickers', () => {
  beforeEach(() => {
    brapiProvider = new BrapiB3Provider()
  })

  it('should be able to return symbol and short name by ticket', async () => {
    const mockedResponse = {
      data: {
        results: [{ shortName: 'XXX RRRR ASDFG', symbol: 'RRRR11' }],
      },
    }

    ;(brapi.get as jest.Mock).mockResolvedValueOnce(mockedResponse)

    const stock = await brapiProvider.getQuoteTickers('RRRR11')

    expect(stock).toEqual({
      shortName: 'XXX RRRR ASDFG',
      symbol: 'RRRR11',
    })
  })

  it('should be able to return invalid request to response 400', async () => {
    ;(brapi.get as jest.Mock).mockRejectedValueOnce({
      response: { status: 400 },
    })

    const promise = brapiProvider.getQuoteTickers('?')

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toMatchObject({
      message: 'Invalid request to the BrAPI',
      statusCode: 400,
    })
  })

  it('should be able to return Invalid or unauthorized token to response 401', async () => {
    ;(brapi.get as jest.Mock).mockRejectedValueOnce({
      response: { status: 401 },
    })

    const promise = brapiProvider.getQuoteTickers('VALID')

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toMatchObject({
      message: 'Invalid or unauthorized token',
      statusCode: 401,
    })
  })

  it('should be able to return request limit reached to response 402', async () => {
    ;(brapi.get as jest.Mock).mockRejectedValueOnce({
      response: { status: 402 },
    })

    const promise = brapiProvider.getQuoteTickers('VALID')

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toMatchObject({
      message: 'Request limit reached for the BrAPI',
      statusCode: 402,
    })
  })

  it('should be able to return not found to response 404', async () => {
    ;(brapi.get as jest.Mock).mockRejectedValueOnce({
      response: { status: 404 },
    })

    const promise = brapiProvider.getQuoteTickers('INVALID')

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toMatchObject({
      message: 'Stock not found for the BrAPI',
      statusCode: 404,
    })
  })
})
