import { createContext, ReactNode, useState } from 'react'

import {
  apiHeaders,
  apiSignIn,
  SignInBody,
  SignInResponse,
} from '@/api/sign-in'

type User = {
  name: string
  email: string
}

type AuthState = {
  token: string
  user: User
}

type AuthContextData = {
  signIn(credentials: SignInBody): Promise<void>
  isAuthenticated: boolean
  user: User | undefined
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@triadge:token')
    const userString = localStorage.getItem('@triadge:user')

    if (token && userString) {
      const user = JSON.parse(userString)

      apiHeaders(token)

      return { token, user }
    }

    return {} as AuthState
  })
  const isAuthenticated = !!data.user

  async function signIn({ email, password }: SignInBody) {
    const { user, token }: SignInResponse = await apiSignIn({ email, password })

    localStorage.setItem('@triadge:token', token)
    localStorage.setItem('@triadge:user', JSON.stringify(user))

    apiHeaders(token)

    setData({
      token,
      user,
    })
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user: data.user }}>
      {children}
    </AuthContext.Provider>
  )
}

export type { AuthContextData }
export { AuthContext, AuthProvider }
