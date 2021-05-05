import { useAuth } from '~/contexts'
import { validateUserPermissions } from '~/utils'

import { useCanProps } from './types'

export const useCan = ({ permissions, roles }: useCanProps) => {
  const { user, isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return false
  }
  return validateUserPermissions({ user, permissions, roles })
}
