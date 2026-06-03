import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'

export interface ApiClientConfig {
  baseURL: string
  timeout?: number
  withCredentials?: boolean
}

export type SignOut = () => void
export type OnTokenRefreshed = (
  token: string,
  user: { name: string; email: string },
) => void

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

export function decodeTokenExp(token: string): number | null {
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload))
    return decoded.exp ?? null
  } catch {
    return null
  }
}

let isRefreshing = false
let failedQueue: Array<{
  resolve: (config: InternalAxiosRequestConfig) => void
  reject: (error: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve({
        headers: { Authorization: `Bearer ${token}` },
      } as InternalAxiosRequestConfig)
    }
  })
  failedQueue = []
}

export function registerInterceptorTokenManager(
  signOut: SignOut,
  onTokenRefreshed?: OnTokenRefreshed,
) {
  const api = getApiClient()

  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status !== 401) {
        return Promise.reject(error)
      }

      const originalRequest = error.config

      // Don't retry the refresh endpoint itself to avoid infinite loop
      if (originalRequest.url?.includes('/refresh-token')) {
        signOut()
        return Promise.reject(error)
      }

      if (originalRequest._retry) {
        signOut()
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((config) => {
          originalRequest.headers = (
            config as InternalAxiosRequestConfig
          ).headers
          return api(originalRequest)
        })
      }

      isRefreshing = true
      originalRequest._retry = true

      try {
        const response = await api.patch('/refresh-token')
        const { token: newToken, user } = response.data

        setAccessToken(newToken)

        if (onTokenRefreshed) {
          onTokenRefreshed(newToken, user)
        }

        processQueue(null, newToken)

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        signOut()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}
