/* eslint-disable no-return-await */
/* eslint-disable prettier/prettier */
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

import { parseCookies } from 'nookies'

import { COOKIE_KEY } from '~/constants'

export const withSSRGuest = <T>(
  fn: GetServerSideProps<T>
): GetServerSideProps => async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx)

    if (cookies[`${COOKIE_KEY}.token`]) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }
    return await fn(ctx)
  }
