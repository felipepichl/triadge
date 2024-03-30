import { api } from '@/lib/axios'

export type SignInBody = {
  email: string
  password: string
}

export type SignInResponse = {
  userResponse: { name: string; email: string }
}

export async function apiSignIn({
  email,
  password,
}: SignInBody): Promise<SignInResponse> {
  const response = await api.post('/sessions', { email, password })

  const { name } = response.data.user

  const userResponse = { name, email }

  return { userResponse }
}
