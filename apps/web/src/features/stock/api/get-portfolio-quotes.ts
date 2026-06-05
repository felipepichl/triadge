import { PortfolioResponseDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

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
