import { api } from '@/lib/axios'

export type SignInBody = {
  email: string
  password: string
}

export type SignInResponse = {
  signInResponse: { name: string; email: string }
}

export async function apiSignIn({
  email,
  password,
}: SignInBody): Promise<SignInResponse> {
  const response = await api.post('/sessions', { email, password })

  const { name } = response.data.user

  const signInResponse = { name, email }

  return { signInResponse }
}
