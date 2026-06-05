import { SignOut } from '@/lib/@types/api-types'
import { api } from '@/lib/axios'

export function registerInterceptorTokenManager(signOut: SignOut) {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (requestError) => {
      if (requestError?.response?.status === 401) {
        signOut()
      }

      return Promise.reject(requestError)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}
