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
import { registerInterceptorTokenManager } from '@/api/sign-out'
import { UserDTO } from '@/dtos/UserDTO'
import { initializeGoogleClient } from '@/lib/google/google-client'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@/storage/storage-auth-token'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@/storage/storage-user'

type AuthState = {
  token: string
  user: UserDTO
}

type AuthContextData = {
  signIn(credentials: SignInBody): Promise<void>
  signOut(immediate?: boolean): void
  signInWithGoogle(): Promise<void>
  isAuthenticated: boolean
  isSignOut: boolean
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

function storageUserAndTokenSave(user: UserDTO, token: string) {
  storageUserSave(user)
  storageAuthTokenSave(token)
}

function storageUserAndTokenRemove() {
  storageUserRemove()
  storageAuthTokenRemove()
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
  const [isSignOut, setIsSignOut] = useState(false)

  const signIn = useCallback(async ({ email, password }: SignInBody) => {
    const { user, token }: SignInResponse = await apiSignIn({ email, password })

    storageUserAndTokenSave(user, token)

    apiHeaders(token)

    setData({
      token,
      user,
    })
  }, [])

  const signOut = useCallback((immediate = false) => {
    const performLogout = () => {
      storageUserAndTokenRemove()
      setData({} as AuthState)
      setIsSignOut(false)
    }

    if (immediate) {
      performLogout()
    } else {
      setIsSignOut(true)
      setTimeout(performLogout, 7000)
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!isGoogleInitialized) {
      console.error('Google API client não foi inicializado')
      return
    }

    const { accessToken } = await apiGoogleSignIn()

    console.log('GoogleAccessToken => ', accessToken)

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

  useEffect(() => {
    const subcribe = registerInterceptorTokenManager(signOut)

    return () => {
      subcribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signInWithGoogle,
        isAuthenticated,
        isSignOut,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export type { AuthContextData }
export { AuthContext, AuthProvider }
