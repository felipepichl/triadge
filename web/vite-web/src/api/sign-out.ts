import { SignOut } from '@/lib/@types/api-types'
import { api } from '@/lib/axios'

export function registerInterceptorTokenManager(signOut: SignOut) {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (requestError) => {
      if (requestError?.response?.status === 401) {
        if (requestError.response.data?.message === 'Invalid JWT Token') {
          // here
          console.log('=> Invalid JWT Token')
        }

        signOut()
      }

      // if (isAxiosError(error)) {
      //   const status = error.response?.status
      //   const message = error.response?.data.message

      //   console.log(`STATUS HERE=>`, status)
      //   console.log(`CODE HERE=>`, message)

      //   if (status === 401) {
      //     // signOut()
      //   }
      // }
      return Promise.reject(requestError)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}
