import { createContext, ReactNode, useState } from 'react'

import { apiSignIn, SignInBody } from '@/api/sign-in'

type User = {
  name: string
  email: string
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
  const [user, setUser] = useState<User | undefined>()
  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInBody) {
    const { userResponse } = await apiSignIn({ email, password })

    setUser(userResponse)
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export type { AuthContextData }
export { AuthContext, AuthProvider }
