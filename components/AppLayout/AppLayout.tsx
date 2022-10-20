/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import Drawer from './components/Drawer'
import { useDispatch, useSelector } from 'react-redux'

import { createUser, onChangeAuthState, setAuthLoading } from 'ui/redux/slices/authentication/autentication.slice'
import { AppDispatch } from 'ui/redux/store'
import { useGuardPermissions } from 'ui/hooks/guard.permissions.hook'
import { useRouter } from 'next/router'


/**
 * Componente principal de la aplicación
 */

export default function AppLayout ({ children }: any) {
  const dispatch = useDispatch<AppDispatch>()
  const {subscriptionGranted} = useGuardPermissions() 
  const router = useRouter();
  useEffect(() => {
    onChangeAuthState(async (user: any) => {
      if(user){
        await dispatch(createUser({uid: user.uid, extradata: user.extradata}))
      }else{
        console.log('onChangeAuthState', {uid: 'not-logged'})
        await dispatch(createUser({uid: 'not-logged'}))
      } 
      dispatch(setAuthLoading(false))
    })
  }, [])
  useEffect(() => {
    console.log('useEffect', subscriptionGranted)
    if(subscriptionGranted === false){
      alert('Usuario sin autorización suscribete a tu plan correspondiente')
      router.push('/subscription')
    }
  }, [subscriptionGranted])
  
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
