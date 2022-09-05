/* eslint-disable react-hooks/exhaustive-deps */

import DrawerNav from './components/DrawerNav'
import React, { useEffect } from 'react'
import { onChangeAuthState } from 'ui/redux/slices/authentication/autentication.slice'
import { useAuthentication } from 'ui/hooks/authentication.hook'

export default function AppLayout ({ children }: any) {
  const { createUserById } = useAuthentication()
  useEffect(() => {
    onChangeAuthState(createUserById)
  }, [])
  
  const MemoizedLayaut =  React.memo(AppLayoutView);
  return  <MemoizedLayaut>{children}</MemoizedLayaut>
}


export const AppLayoutView = ({ children }: any) => {
  return (
    <div>
      <DrawerNav>{children}</DrawerNav>
    </div>
  )
}
