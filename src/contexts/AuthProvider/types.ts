import { ReactNode } from 'react'

import { SignInData } from '../../types/submitHandlers'

export type AuthContextData = {
  signIn: (credentials: SignInData) => Promise<void>
  user: User
  isAuthenticated: boolean
}

export type AuthProviderProps = {
  children: ReactNode
}

export type User = {
  email: string
  permissions: string[]
  roles: string[]
}
