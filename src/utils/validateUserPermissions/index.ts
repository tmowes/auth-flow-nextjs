import { ValidateUserPermissionsProps } from './types'

export const validateUserPermissions = ({
  user,
  permissions,
  roles,
}: ValidateUserPermissionsProps) => {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission =>
      user.permissions.includes(permission)
    )

    if (!hasAllPermissions) {
      return false
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => user.roles.includes(role))

    if (!hasAllRoles) {
      return false
    }
  }

  return true
}
