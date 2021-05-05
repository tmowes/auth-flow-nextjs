import { GetServerSideProps } from 'next'

import { Flex, Text } from '@chakra-ui/react'

import * as C from '~/components'
import { withSSRAuth } from '~/utils'
import { setupAPIClient } from '~/services'

export default function Metrics() {
  return (
    <>
      <C.MetaTags />
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Text>Metrics Page</Text>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async ctx => {
    const apiClient = setupAPIClient(ctx)

    const { data } = await apiClient.get('/me')

    console.log(data)

    return {
      props: {},
    }
  },
  { permissions: ['metrics.list'], roles: ['administrator'] }
)
