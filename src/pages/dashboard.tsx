import { Flex, Text } from '@chakra-ui/react'

import * as C from '~/components'
import { useAuth } from '~/contexts'

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
