import { GetServerSideProps } from 'next'

import { Flex, Text } from '@chakra-ui/react'

import * as C from '~/components'
import { useAuth } from '~/contexts'
import { withSSRAuth } from '~/utils'
import { setupAPIClient } from '~/services'

export default function Dashboard() {
  const { user } = useAuth()

  console.log({ user })

  return (
    <>
      <C.MetaTags />
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Text>Dashboard: {user?.email} </Text>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)

  const { data } = await apiClient.get('/me')

  console.log(data)

  return {
    props: {},
  }
})
