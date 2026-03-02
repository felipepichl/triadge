import { gapi } from 'gapi-script'

import { apiGoogleAnalytics, apiGoogleData } from '@/lib/google/apiGoogle'

export type GoogleSignInResponse = {
  accessToken: string
}

export function apiGoogleHeaders(token: string) {
  apiGoogleData.defaults.headers.Authorization = `Bearer ${token}`
  apiGoogleAnalytics.defaults.headers.Authorization = `Bearer ${token}`
}

export async function apiGoogleSignIn(): Promise<GoogleSignInResponse> {
  const googleAuth = gapi.auth2.getAuthInstance()

  const googleUser = await googleAuth.signIn()
  const accessToken = googleUser.getAuthResponse().access_token

  return { accessToken }
}
