import { api } from '@/lib/axios'

import { handleApiError } from '../utils/api-error-handler'

export async function apiGetPortfolioQuotes(type: string) {
  try {
    const { data } = await api.get('/stocks/portfolio', {
      params: { type },
    })

    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    throw handleApiError(error)
  }
}
