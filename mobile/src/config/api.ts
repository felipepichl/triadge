import Constants from 'expo-constants'

export const getApiConfig = () => {
  const isDevelopment = __DEV__

  if (isDevelopment) {
    // Check for Expo tunnel
    const { manifest } = Constants
    const hostUri = manifest?.hostUri

    if (hostUri && (hostUri.includes('exp.direct') || hostUri.includes('expo.dev'))) {
      // Running on Expo Go with tunnel
      const tunnelDomain = hostUri.split(':')[0]
      const apiUrl = `https://${tunnelDomain.replace(/\d+$/, '3331')}`
      console.log('🚀 Using Expo tunnel API URL:', apiUrl)
      return { apiUrl, isTunnel: true }
    }

    // For physical devices/emulators, use machine IP
    // Replace with your actual machine IP when testing on devices
    const machineIP = '192.168.1.100' // Change this to your machine's IP
    const apiUrl = `http://${machineIP}:3331`
    console.log('🏠 Using local machine IP API URL:', apiUrl)
    return { apiUrl, isTunnel: false }
  }

  // Production
  const apiUrl = 'https://api.triadge.com'
  console.log('🏭 Using production API URL:', apiUrl)
  return { apiUrl, isTunnel: false }
}

export const API_TIMEOUT = 10000 // 10 seconds
