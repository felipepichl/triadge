import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { apiGoogleHeaders, apiGoogleSignIn } from '@/api/google/sign-in'
import {
  apiHeaders,
  apiSignIn,
  SignInBody,
  SignInResponse,
} from '@/api/sign-in'
import { UserDTO } from '@/dtos/UserDTO'
import { initializeGoogleClient } from '@/lib/google/google-client'
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@/storage/storage-auth-token'
import { storageUserGet, storageUserSave } from '@/storage/storage-user'

type AuthState = {
  token: string
  user: UserDTO
}

type AuthContextData = {
  signIn(credentials: SignInBody): Promise<void>
  signOut(): void
  signInWithGoogle(): Promise<void>
  isAuthenticated: boolean
  user: UserDTO | undefined
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

const GOOGLE_CLIENT_ID =
  '710477401276-uv7mfuprcsrr00vp9ufno3h8tmdsphkq.apps.googleusercontent.com'
const GOOGLE_API_KEY = 'AIzaSyBv6TNn9uJESNKF3_EqLicr8hxYZRNxfW4'
const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/yt-analytics.readonly',
]

function storageUserAndToken(user: UserDTO, token: string) {
  storageAuthTokenSave(token)
  storageUserSave(user)
}

function getUserAndToken(): [UserDTO, string | null] {
  const user = storageUserGet()
  const token = storageAuthTokenGet()

  return [user, token]
}

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const [user, token] = getUserAndToken()

    if (token && user) {
      apiHeaders(token)

      return { token, user }
    }

    return {} as AuthState
  })
  const isAuthenticated = !!data.user
  const [isGoogleInitialized, setIsGoogleInitialized] = useState(false)

  const signIn = useCallback(async ({ email, password }: SignInBody) => {
    const { user, token }: SignInResponse = await apiSignIn({ email, password })

    storageUserAndToken(user, token)

    apiHeaders(token)

    setData({
      token,
      user,
    })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@triadge:token')
    localStorage.removeItem('@triadge:user')

    setData({} as AuthState)
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!isGoogleInitialized) {
      console.error('Google API client não foi inicializado')
      return
    }

    const { accessToken } = await apiGoogleSignIn()

    localStorage.setItem('@triadge:googleToken', accessToken)

    apiGoogleHeaders(accessToken)
  }, [isGoogleInitialized])

  useEffect(() => {
    initializeGoogleClient({
      apiKey: GOOGLE_API_KEY,
      clientId: GOOGLE_CLIENT_ID,
      scopes: GOOGLE_SCOPES,
    })
      .then(() => {
        setIsGoogleInitialized(true)
      })
      .catch((error) => {
        console.error('Erro ao inicializar cliente Google:', error)
      })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signInWithGoogle,
        isAuthenticated,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export type { AuthContextData }
export { AuthContext, AuthProvider }
