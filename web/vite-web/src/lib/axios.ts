import axios, { AxiosInstance } from 'axios'

import { env } from '@/env'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

export const api = axios.create({
  baseURL: env.VITE_API_URL,
}) as APIInstanceProps
