import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { parseCookies, setCookie } from 'nookies'

import { api } from '~/services'
import { SignInData } from '~/types/submitHandlers'
import { COOKIE_KEY } from '~/constants'

import { AuthContextData, AuthProviderProps, User } from './types'

const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { push } = useRouter()
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'auth-flow.token': token } = parseCookies()
    if (token) {
      const updateUserCookies = async () => {
        const { data } = await api.get('/me')
        const { email, permissions, roles } = data
        setUser({
          email,
          permissions,
          roles,
        })
      }
      updateUserCookies()
    }
  }, [])

  const signIn = async ({ email, password }: SignInData) => {
    try {
      const { data } = await api.post('sessions', {
        email,
        password,
      })

      const { token, refreshToken, roles, permissions } = data

      const cookieOptions = {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      }

      setCookie(undefined, `${COOKIE_KEY}.token`, token, cookieOptions)
      setCookie(
        undefined,
        `${COOKIE_KEY}.refreshToken`,
        refreshToken,
        cookieOptions
      )

      setUser({
        email,
        permissions,
        roles,
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  const providerValues = {
    signIn,
    user,
    isAuthenticated,
  }

  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('')
  }
  return context
}