import { ReactNode } from 'react'

export type CanProps = {
  children: ReactNode
  permissions?: string[]
  roles?: string[]
}
