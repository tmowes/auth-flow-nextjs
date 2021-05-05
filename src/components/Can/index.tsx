import { useCan } from '~/hooks'

import { CanProps } from './types'

export const Can = (props: CanProps) => {
  const { children, permissions, roles } = props
  const userCanSeeComponent = useCan({ permissions, roles })

  if (!userCanSeeComponent) {
    return null
  }

  return <>{children}</>
}
