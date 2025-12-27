import axios from 'axios'

import { API_TIMEOUT, getApiConfig } from '@/config/api'

import { APIInstanceProps } from './@types/api-types'

const { apiUrl: API_URL } = getApiConfig()

const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
}) as APIInstanceProps

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log('📡 API Request:', config.method?.toUpperCase(), config.url)
    }
    return config
  },
  (error) => {
    if (__DEV__) {
      console.log('📡 Request Error:', error)
    }
    return Promise.reject(error)
  },
)

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('✅ API Response:', response.status, response.config.url)
    }
    return response
  },
  (error) => {
    // API errors are handled by individual components (toasts)
    // Only log in development terminal for debugging
    if (__DEV__) {
      console.log('❌ API Error (Dev Only):', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.message,
        code: error.code,
      })

      // Handle network errors specifically
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        console.log('🌐 Network Error - Check server connectivity and API URL')
        console.log('🌐 Current API URL:', API_URL)
      }
    }

    return Promise.reject(error)
  },
)

// Implementa o método registerInterceptTokenManager na instância do axios
api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (requestError) => {
      if (requestError?.response?.status === 401) {
        console.log('🚪 Token expired, signing out...')
        signOut()
      }
      return Promise.reject(requestError)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
