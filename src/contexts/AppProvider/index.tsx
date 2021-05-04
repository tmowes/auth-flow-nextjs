import { AuthProvider } from '../AuthProvider'
import { AppProviderProps } from './types'

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>{children}</AuthProvider>
)
