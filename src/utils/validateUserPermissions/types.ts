export type User = {
  permissions: string[]
  roles: string[]
}

export type ValidateUserPermissionsProps = {
  user: User
  permissions?: string[]
  roles?: string[]
}
