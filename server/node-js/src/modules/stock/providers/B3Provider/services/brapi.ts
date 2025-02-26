import axios from 'axios'

const brapi = axios.create({
  baseURL: 'https://brapi.dev/api',
})

export { brapi }
