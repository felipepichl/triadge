import { initApiClient } from '@umabel/core'

import { env } from '@/env'

const api = initApiClient({
  baseURL: env.VITE_API_URL,
})

export { api }
