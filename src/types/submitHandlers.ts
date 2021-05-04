import type { SubmitHandler } from 'react-hook-form'

export type SignInFormData = SubmitHandler<SignInData>

export type SignInData = {
  email: string
  password: string
}
