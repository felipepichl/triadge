import { getApiClient } from '../../client'

export type RefreshTokenResponse = {
  user: {
    name: string
    email: string
  }
  token: string
}

export async function apiRefreshToken(): Promise<RefreshTokenResponse> {
  const api = getApiClient()
  const response = await api.patch('/refresh-token')

  const { user, token } = response.data as RefreshTokenResponse

  return { user, token }
}
