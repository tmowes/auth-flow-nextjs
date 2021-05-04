import { ForwardRefRenderFunction } from 'react'

import { InputProps } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

export type InputBaseProps = ForwardRefRenderFunction<
  HTMLInputElement,
  CustomInputProps
>

export type CustomInputProps = InputProps & {
  name: string
  label?: string
  error?: FieldError
}
