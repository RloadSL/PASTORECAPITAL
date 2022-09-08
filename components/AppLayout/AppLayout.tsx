/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import Drawer from './components/Drawer'
import { useDispatch, useSelector } from 'react-redux'

import { createUser, onChangeAuthState } from 'ui/redux/slices/authentication/autentication.slice'
import { AppDispatch } from 'ui/redux/store'
import { useRouter } from 'next/router'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import useRouterGuard from 'ui/hooks/router.hook'

/**
 * Componente principal de la aplicación
 */

export default function AppLayout ({ children }: any) {
  const dispatch = useDispatch<AppDispatch>()
  useRouterGuard()
  useEffect(() => {
    onChangeAuthState((user: any) => {
      dispatch(createUser(user.uid))
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
