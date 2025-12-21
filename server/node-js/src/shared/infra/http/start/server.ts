import 'reflect-metadata'

import { app } from './app'

const server = app.listen(3331, () => {
  console.log('✅ Server running in port 3331')
})

server.on('error', (error) => {
  console.error('❌ Server failed to start:', error.message)
  process.exit(1)
})

server.on('listening', () => {
  // Server started successfully
})
