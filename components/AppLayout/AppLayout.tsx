/* eslint-disable react-hooks/exhaustive-deps */

import DrawerNav from './components/DrawerNav'
import { useEffect } from 'react'
import { onChangeAuthState } from 'ui/redux/slices/authentication/autentication.slice'
import { useAuthentication } from 'ui/hooks/authentication.hook'

export default function AppLayout ({ children }: any) {
  const { createUserById } = useAuthentication()
  useEffect(() => {
    onChangeAuthState(createUserById)
  }, [])

  return <AppLayoutView>{children}</AppLayoutView>
}

export const AppLayoutView = ({ children }: any) => {
  return (
    <div>
      <DrawerNav>{children}</DrawerNav>
    </div>
  )
}
