import { isAxiosError } from 'axios'

import { SignOut } from '@/lib/@types/api-types'
import { api } from '@/lib/axios'

export function registerInterceptorTokenManager(signOut: SignOut) {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status
        const message = error.response?.data.message

        console.log(`STATUS HERE=>`, status)
        console.log(`CODE HERE=>`, message)

        if (status === 401) {
          // signOut()
        }
      }
      return Promise.reject(error)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}
