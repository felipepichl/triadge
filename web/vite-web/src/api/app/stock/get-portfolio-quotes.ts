import { PortfolioResponseDTO } from '@/dtos/stock-dto'
import { api } from '@/lib/axios'

import { handleApiError } from '../utils/api-error-handler'

export async function apiGetPortfolioQuotes(
  type: string,
): Promise<PortfolioResponseDTO> {
  try {
    const { data } = await api.get<PortfolioResponseDTO>('/stocks/portfolio', {
      params: { type },
    })

    return data
  } catch (error) {
    throw handleApiError(error)
  }
}
