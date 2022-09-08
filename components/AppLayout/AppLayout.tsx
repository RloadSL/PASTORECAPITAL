/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import Drawer from './components/Drawer'
import { useDispatch } from 'react-redux'

import { createUser, onChangeAuthState } from 'ui/redux/slices/authentication/autentication.slice'
import { AppDispatch } from 'ui/redux/store'

/**
 * Componente principal de la aplicación
 */

export default function AppLayout ({ children }: any) {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    onChangeAuthState((user: any) => {
      dispatch(createUser(user.uid))
      console.log('useEffect AppLayout', user)
    })
  }, [])
  const MemoizedLayout = React.memo(AppLayoutView)
  return <MemoizedLayout>{children}</MemoizedLayout>
}

export const AppLayoutView = ({ children }: any) => {
  return (
    <div>
      <Drawer>{children}</Drawer>
    </div>
  )
}
