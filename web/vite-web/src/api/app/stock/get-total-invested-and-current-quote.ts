import { api } from '@/lib/axios'

import { handleApiError } from '../utils/api-error-handler'

type InvestementResponseDTO = {
  totalInvested: number
  currentValue: number
}

export async function apiGetTotalInvestedAndCurrentQuote(
  type: string,
): Promise<InvestementResponseDTO> {
  try {
    const { data } = await api.get<InvestementResponseDTO>(
      '/stocks/invenstment',
      {
        params: { type },
      },
    )

    return data
  } catch (error) {
    throw handleApiError(error)
  }
}
