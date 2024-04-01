import { createContext, ReactNode, useState } from 'react'

import { apiSignIn, SignInBody, SignInResponse } from '@/api/sign-in'

type AuthContextData = {
  signIn(credentials: SignInBody): Promise<void>
  isAuthenticated: boolean
  user: SignInResponse | undefined
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SignInResponse | undefined>()
  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInBody) {
    const { signInResponse } = await apiSignIn({ email, password })

    setUser({ signInResponse })
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export type { AuthContextData }
export { AuthContext, AuthProvider }
