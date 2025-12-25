import { AxiosInstance } from 'axios'

export type SignOut = () => void

export type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}
