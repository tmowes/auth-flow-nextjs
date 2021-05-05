import { GetServerSideProps } from 'next'

import { Button, Flex, Stack, Text } from '@chakra-ui/react'

import * as C from '~/components'
import { useAuth } from '~/contexts'
import { withSSRAuth } from '~/utils'
import { setupAPIClient } from '~/services'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <>
      <C.MetaTags />
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Stack>
          <Text>Dashboard: {user?.email} </Text>
          <C.Can permissions={['metrics.list']}>
            <Text>canSeeMetrics</Text>
          </C.Can>
          <C.Can roles={['administrator']}>
            <Text>onlyAdministrator</Text>
          </C.Can>
          <Button colorScheme="blackAlpha" size="lg" my="1" onClick={signOut}>
            Sair
          </Button>
        </Stack>
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
