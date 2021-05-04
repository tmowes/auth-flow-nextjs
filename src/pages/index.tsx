import { Flex, Button, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as C from '~/components'
import { SignInFormData } from '~/types'
import { signInSchema } from '~/utils'
import { useAuth } from '~/contexts'

export default function SignIn() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(signInSchema),
  })

  const { signIn } = useAuth()

  const { errors, isSubmitting } = formState

  const handleSignIn: SignInFormData = async data => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    await signIn(data)
    reset({
      email: '',
      password: '',
    })
  }

  return (
    <>
      <C.MetaTags />
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="6">
            <C.Input
              name="email"
              type="email"
              label="E-mail"
              error={errors.email}
              {...register('email')}
            />
            <C.Input
              name="password"
              type="password"
              label="Senha"
              error={errors.password}
              {...register('password')}
            />

            <Button
              type="submit"
              colorScheme="blackAlpha"
              size="lg"
              my="1"
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  )
}
