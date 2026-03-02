import { getApiClient } from '../../client'

export type SignInBody = {
  email: string
  password: string
}

export type SignInResponse = {
  user: {
    name: string
    email: string
  }
  token: string
}

export async function apiSignIn({
  email,
  password,
}: SignInBody): Promise<SignInResponse> {
  const api = getApiClient()
  const response = await api.post('/sessions', { email, password })

  const { user, token } = response.data as SignInResponse

  return { user, token }
}
