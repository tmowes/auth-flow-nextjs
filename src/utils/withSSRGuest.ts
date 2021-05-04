import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { parseCookies } from 'nookies'

import { COOKIE_KEY } from '~/constants'

export const withSSRGuest = (fn: GetServerSideProps) => async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = parseCookies(ctx)

  if (cookies[`${COOKIE_KEY}.token`]) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }
  // eslint-disable-next-line no-return-await
  return await fn(ctx)
}
