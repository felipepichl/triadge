import {
  apiRefreshToken,
  apiSignIn,
  decodeTokenExp,
  getAccessToken,
  type OnTokenRefreshed,
  registerInterceptorTokenManager,
  setAccessToken,
  type SignInBody,
  type SignInResponse,
  type UserDTO,
} from '@umabel/core'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { apiGoogleHeaders, apiGoogleSignIn } from '@/api/google/sign-in'
import { initializeGoogleClient } from '@/lib/google/google-client'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@/storage/storage-user'

const SESSION_WARNING_BEFORE_MS = 30 * 1000 // TODO: restore to 2 * 60 * 1000 after testing

type AuthContextData = {
  signIn(credentials: SignInBody): Promise<void>
  signOut(immediate?: boolean): void
  signInWithGoogle(): Promise<void>
  renewSession(): Promise<void>
  isAuthenticated: boolean
  isSessionExpiring: boolean
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

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO | undefined>(() => {
    const stored = storageUserGet()
    return stored?.name ? stored : undefined
  })

  const isAuthenticated = !!user
  const [isGoogleInitialized, setIsGoogleInitialized] = useState(false)
  const [isSignOut, setIsSignOut] = useState(false)
  const [isSessionExpiring, setIsSessionExpiring] = useState(false)
  const sessionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearSessionTimer = useCallback(() => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current)
      sessionTimerRef.current = null
    }
  }, [])

  const scheduleSessionWarning = useCallback(
    (token: string) => {
      clearSessionTimer()

      const exp = decodeTokenExp(token)
      if (!exp) return

      const now = Math.floor(Date.now() / 1000)
      const msUntilExpiry = (exp - now) * 1000
      const msUntilWarning = msUntilExpiry - SESSION_WARNING_BEFORE_MS

      if (msUntilWarning <= 0) {
        setIsSessionExpiring(true)
        return
      }

      sessionTimerRef.current = setTimeout(() => {
        setIsSessionExpiring(true)
      }, msUntilWarning)
    },
    [clearSessionTimer],
  )

  const signIn = useCallback(
    async ({ email, password }: SignInBody) => {
      const { user: userData, token }: SignInResponse = await apiSignIn({
        email,
        password,
      })

      storageUserSave(userData)
      setAccessToken(token)
      setUser(userData)
      scheduleSessionWarning(token)
    },
    [scheduleSessionWarning],
  )

  const signOut = useCallback(
    (immediate = false) => {
      const performLogout = () => {
        clearSessionTimer()
        setAccessToken(null)
        storageUserRemove()
        setUser(undefined)
        setIsSignOut(false)
        setIsSessionExpiring(false)
      }

      if (immediate) {
        performLogout()
      } else {
        setIsSignOut(true)
        setTimeout(performLogout, 7000)
      }
    },
    [clearSessionTimer],
  )

  const renewSession = useCallback(async () => {
    try {
      const { user: userData, token } = await apiRefreshToken()

      setAccessToken(token)
      storageUserSave(userData)
      setUser(userData)
      setIsSessionExpiring(false)
      scheduleSessionWarning(token)
    } catch {
      signOut(true)
    }
  }, [scheduleSessionWarning, signOut])

  const onTokenRefreshed: OnTokenRefreshed = useCallback(
    (token: string, userData: { name: string; email: string }) => {
      storageUserSave(userData)
      setUser(userData)
      scheduleSessionWarning(token)
    },
    [scheduleSessionWarning],
  )

  const signInWithGoogle = useCallback(async () => {
    if (!isGoogleInitialized) {
      console.error('Google API client não foi inicializado')
      return
    }

    const { accessToken } = await apiGoogleSignIn()

    localStorage.setItem('@triadge:googleToken', accessToken)

    apiGoogleHeaders(accessToken)
  }, [isGoogleInitialized])

  // Restore session on page reload via refresh token (skip if token already in memory from fresh login)
  useEffect(() => {
    const storedUser = storageUserGet()
    if (!storedUser?.name) return

    // If access token is already in memory, user just logged in — no need to refresh
    if (getAccessToken()) return

    apiRefreshToken()
      .then(({ user: userData, token }) => {
        setAccessToken(token)
        storageUserSave(userData)
        setUser(userData)
        scheduleSessionWarning(token)
      })
      .catch(() => {
        storageUserRemove()
        setUser(undefined)
      })
  }, [scheduleSessionWarning])

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
    const unsubscribe = registerInterceptorTokenManager(
      signOut,
      onTokenRefreshed,
    )

    return () => {
      unsubscribe()
    }
  }, [signOut, onTokenRefreshed])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signInWithGoogle,
        renewSession,
        isAuthenticated,
        isSessionExpiring,
        isSignOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export type { AuthContextData }
export { AuthContext, AuthProvider }
