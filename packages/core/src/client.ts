import axios, { type AxiosInstance } from 'axios'

export interface ApiClientConfig {
  baseURL: string
  timeout?: number
  withCredentials?: boolean
}

export type SignOut = () => void

let apiInstance: AxiosInstance | null = null
let accessToken: string | null = null

export function initApiClient(config: ApiClientConfig): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
    withCredentials: config.withCredentials ?? false,
  })

  instance.interceptors.request.use((reqConfig) => {
    if (accessToken) {
      reqConfig.headers.Authorization = `Bearer ${accessToken}`
    }

    return reqConfig
  })

  apiInstance = instance
  return instance
}

export function getApiClient(): AxiosInstance {
  if (!apiInstance) {
    throw new Error(
      '@umabel/core: API client not initialized. Call initApiClient() first.',
    )
  }
  return apiInstance
}

export function setAccessToken(token: string | null) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken
}

export function registerInterceptorTokenManager(signOut: SignOut) {
  const api = getApiClient()

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
