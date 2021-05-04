import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

import { COOKIE_KEY } from '~/constants'
import { signOut } from '~/contexts'

import { AuthTokenError } from './errors/AuthTokenError'

let isRefreshing = false
let failedRequestsQueue = []

export const setupAPIClient = (ctx = undefined) => {
  let cookies = parseCookies(ctx)
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['auth-flow.token']}`,
    },
  })

  api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          // renovar o token
          cookies = parseCookies(ctx)
          const { 'auth-flow.refreshToken': refreshToken } = cookies
          const originalConfig = error.config

          const updateToken = async () => {
            const { data } = await api.post('/refresh', { refreshToken })
            const cookieOptions = {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            }

            setCookie(ctx, `${COOKIE_KEY}.token`, data.token, cookieOptions)
            setCookie(
              ctx,
              `${COOKIE_KEY}.refreshToken`,
              data.refreshToken,
              cookieOptions
            )
            api.defaults.headers.Authorization = `Bearer ${data.token}`
            failedRequestsQueue.forEach(request =>
              request.onSuccess(data.token)
            )
            failedRequestsQueue = []
          }
          if (!isRefreshing) {
            isRefreshing = true
            updateToken()
              .catch(err => {
                failedRequestsQueue.forEach(request => request.onFailure(err))
                failedRequestsQueue = []
                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers.Authorization = `Bearer ${token}`
                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        }
        if (process.browser) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
      return Promise.reject(error)
    }
  )
  return api
}
