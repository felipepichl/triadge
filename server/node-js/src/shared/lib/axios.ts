import axios from 'axios'

const brapi = axios.create({
  baseURL: process.env.BRAPI_URL,
})

export { brapi }
