import axios from 'axios'

import { env } from '@/env'

import { APIInstanceProps } from './@types/api-types'

const api = axios.create({
  baseURL: env.VITE_API_URL,
}) as APIInstanceProps

export { api }
