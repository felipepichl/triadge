import { InvestementResponseDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

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
