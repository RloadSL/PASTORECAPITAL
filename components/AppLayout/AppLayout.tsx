/* eslint-disable react-hooks/exhaustive-deps */


import React, { useEffect } from 'react'
import { onChangeAuthState } from 'ui/redux/slices/authentication/autentication.slice'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import Drawer from './components/Drawer'

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
      <Drawer>{children}</Drawer>
    </div>
  )
}
