/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

import { destroyCookie, parseCookies } from 'nookies'

import { COOKIE_KEY } from '~/constants'
import { AuthTokenError } from '~/services/errors/AuthTokenError'

export const withSSRAuth = <T>(
  fn: GetServerSideProps<T>
): GetServerSideProps => async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx)

    if (!cookies[`${COOKIE_KEY}.token`]) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
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
