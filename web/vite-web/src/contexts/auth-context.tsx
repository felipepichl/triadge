import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '@/services/api'

type User = {
  name: string
  email: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = false

  const navigate = useNavigate()

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password,
    })

    const { name } = response.data

    setUser({
      email,
      name,
    })

    console.log('here', user)

    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
