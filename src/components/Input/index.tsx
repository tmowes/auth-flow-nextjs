import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input as ChakraInput,
} from '@chakra-ui/react'

import { InputBaseProps } from './types'

const InputBase: InputBaseProps = (props, ref) => {
  const { name, label, error = null, ...rest } = props
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel my="1" lineHeight="1" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="orange.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900',
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && (
        <FormErrorMessage my="0.5" lineHeight="1">
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
