import {
  apiSignIn,
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
  useState,
} from 'react'

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
  isAuthenticated: boolean
  isSignOut: boolean
  user: UserDTO | undefined
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

async function storageUserAndTokenSave(user: UserDTO, token: string) {
  await Promise.all([storageUserSave(user), storageAuthTokenSave(token)])
}

async function storageUserAndTokenRemove() {
  await Promise.all([storageUserRemove(), storageAuthTokenRemove()])
}

async function getUserAndToken(): Promise<[UserDTO, string | null]> {
  const [user, token] = await Promise.all([
    storageUserGet(),
    storageAuthTokenGet(),
  ])

  return [user, token]
}

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => ({}) as AuthState)
  const [isSignOut, setIsSignOut] = useState(false)

  const isAuthenticated = !!data.user

  const signIn = useCallback(async ({ email, password }: SignInBody) => {
    const { user, token }: SignInResponse = await apiSignIn({ email, password })

    await storageUserAndTokenSave(user, token)

    setAccessToken(token)

    setData({
      token,
      user,
    })
  }, [])

  const signOut = useCallback(async (immediate = false) => {
    const performLogout = async () => {
      await storageUserAndTokenRemove()
      setData({} as AuthState)
      setIsSignOut(false)
    }

    if (immediate) {
      await performLogout()
    } else {
      setIsSignOut(true)
      setTimeout(performLogout, 7000)
    }
  }, [])

  useEffect(() => {
    const loadUserData = async () => {
      const [user, token] = await getUserAndToken()

      if (token && user.email) {
        setAccessToken(token)

        setData({ token, user })
      }
    }

    loadUserData()
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
