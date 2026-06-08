import { PortfolioResponseDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

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
