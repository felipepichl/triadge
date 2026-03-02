import 'reflect-metadata'

import { app } from './app'

const PORT = Number(process.env.PORT) || 3331

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('error', (error) => {
  console.error('Server failed to start:', error.message)
  process.exit(1)
})
