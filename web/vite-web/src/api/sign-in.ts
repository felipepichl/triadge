import { api } from '@/lib/axios'

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

export function apiHeaders(header: string) {
  api.defaults.headers.authorization = `Bearer ${header}`
}

export async function apiSignIn({
  email,
  password,
}: SignInBody): Promise<SignInResponse> {
  const response = await api.post('/sessions', { email, password })

  const { user, token } = response.data as SignInResponse

  return { user, token }
}
