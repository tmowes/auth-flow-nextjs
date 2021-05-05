/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

import { destroyCookie, parseCookies } from 'nookies'
import decode from 'jwt-decode'

import { COOKIE_KEY } from '~/constants'
import { AuthTokenError } from '~/services/errors/AuthTokenError'

import { validateUserPermissions } from '../validateUserPermissions'
import { UserDecodeProps, WithSSRAuthOptions } from './type'

export const withSSRAuth = <T>(
  fn: GetServerSideProps<T>,
  options?: WithSSRAuthOptions
): GetServerSideProps => async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx)
    const token = cookies[`${COOKIE_KEY}.token`]

    if (!cookies[`${COOKIE_KEY}.token`]) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    if (options) {
      const user = decode<UserDecodeProps>(token)

      const { permissions, roles } = options

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles,
      })

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          },
        }
      }
    }
    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, `${COOKIE_KEY}.token`)
        destroyCookie(ctx, `${COOKIE_KEY}.refreshToken`)

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }
  }
