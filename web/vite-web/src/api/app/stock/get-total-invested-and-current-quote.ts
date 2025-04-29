import { InvestementResponseDTO } from '@/dtos/stock-dto'
import { api } from '@/lib/axios'

import { handleApiError } from '../utils/api-error-handler'

export async function apiGetTotalInvestedAndCurrentQuote(
  type: string,
): Promise<InvestementResponseDTO> {
  try {
    const { data } = await api.get<InvestementResponseDTO>(
      '/stocks/investement',
      {
        params: { type },
      },
    )

    return data
  } catch (error) {
    throw handleApiError(error)
  }
}
