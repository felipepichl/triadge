import { initApiClient } from '@umabel/core'

import { API_TIMEOUT, getApiConfig } from '@/config/api'

const { apiUrl: API_URL } = getApiConfig()

const api = initApiClient({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
})

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log('API Request:', config.method?.toUpperCase(), config.url)
    }
    return config
  },
  (error) => {
    if (__DEV__) {
      console.log('Request Error:', error)
    }
    return Promise.reject(error)
  },
)

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('API Response:', response.status, response.config.url)
    }
    return response
  },
  (error) => {
    if (__DEV__) {
      console.log('API Error (Dev Only):', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.message,
        code: error.code,
      })

      if (error.code === 'NETWORK_ERROR' || !error.response) {
        console.log('Network Error - Check server connectivity and API URL')
        console.log('Current API URL:', API_URL)
      }
    }

    return Promise.reject(error)
  },
)

export { api }
