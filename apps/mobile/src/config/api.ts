export function getApiConfig(): { apiUrl: string } {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim() ?? ''
  return { apiUrl }
}

export const API_TIMEOUT = Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 0
