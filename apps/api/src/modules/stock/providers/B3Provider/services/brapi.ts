import axios from 'axios'

const brapi = axios.create({
  baseURL: 'https://brapi.dev/api',
  headers: {
    Authorization: `Bearer ${process.env.BRAPI_TOKEN}`,
  },
})

export { brapi }
