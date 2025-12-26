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
    console.log('📡 API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('📡 Request Error:', error)
    return Promise.reject(error)
  },
)

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      code: error.code,
    })

    // Handle network errors specifically
    if (error.code === 'NETWORK_ERROR' || !error.response) {
      console.error('🌐 Network Error - Check server connectivity and API URL')
      console.error('🌐 Current API URL:', API_URL)
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
