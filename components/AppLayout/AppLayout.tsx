/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import Drawer from './components/Drawer'
import { useDispatch, useSelector } from 'react-redux'

import { createUser, onChangeAuthState, setAuthLoading } from 'ui/redux/slices/authentication/autentication.slice'
import { AppDispatch } from 'ui/redux/store'


/**
 * Componente principal de la aplicación
 */

export default function AppLayout ({ children }: any) {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    onChangeAuthState(async (user: any) => {
     
      if(user){
        await dispatch(createUser({uid: user.uid, extradata: user.extradata}))
      } 
      dispatch(setAuthLoading(false))
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
