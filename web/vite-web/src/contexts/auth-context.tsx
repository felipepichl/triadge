import { createContext, ReactNode, useState } from 'react'

import { apiSignIn, headers, SignInBody } from '@/api/sign-in'

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
  // const [user, setUser] = useState<SignInResponse | undefined>()
  // const isAuthenticated = !!user

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@triadge:token')
    const user = localStorage.getItem('@triadge:user')

    if (token && user) {
      headers(token)
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  async function signIn({ email, password }: SignInBody) {
    const { user, token } = await apiSignIn({ email, password })

    localStorage.setItem('@triadge:token', token)
    localStorage.setItem('@triadge:user', JSON.stringify(user))

    headers(token)

    setData({
      token,
      user,
    })
  }

  const isAuthenticated = !!data

  console.log('data', data.user)

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user: data.user }}>
      {children}
    </AuthContext.Provider>
  )
}

export type { AuthContextData }
export { AuthContext, AuthProvider }
