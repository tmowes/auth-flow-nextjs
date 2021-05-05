/* eslint-disable radar/no-small-switch */
import { createContext, useContext, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { SignInData } from '~/types/submitHandlers'
import { COOKIE_KEY } from '~/constants'
import { api } from '~/services'

import { AuthContextData, AuthProviderProps, User } from './types'

const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export const signOut = () => {
  destroyCookie(undefined, `${COOKIE_KEY}.token`)
  destroyCookie(undefined, `${COOKIE_KEY}.refreshToken`)
  authChannel.postMessage('signOut')
  Router.push('/')
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { push } = useRouter()
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = ({ data }) => {
      switch (data) {
        case 'signOut':
          signOut()
          break
        // case 'signIn':
        //   push('/dashboard')
        //   break
        default:
          break
      }
    }
  }, [])

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
      updateUserCookies().catch(_ => {
        signOut()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // authChannel.postMessage('signIn')
    } catch (error) {
      console.log(error)
    }
  }

  const providerValues = {
    signIn,
    signOut,
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
