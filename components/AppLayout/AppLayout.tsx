/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useReducer } from 'react'

import Drawer from './components/Drawer'
import { useDispatch, useSelector } from 'react-redux'

import {
  createUser,
  onChangeAuthState,
  setAuthLoading
} from 'ui/redux/slices/authentication/autentication.slice'
import { AppDispatch } from 'ui/redux/store'
import { useGuardPermissions } from 'ui/hooks/guard.permissions.hook'
import { useRouter } from 'next/router'
import AlertApp from 'components/AlertApp'
import { FormattedMessage } from 'react-intl'
import { setLoading } from 'ui/redux/slices/system/system.slice'

export const SubscriptionGranted = createContext<any>(null)
const initialState = {subscriptionGranted: true};

function reducerPermission(state:any, action:{garanted: 'garant' | 'no_garant'}) {
  switch (action.garanted) {
    case 'garant':
      return {...state,subscriptionGranted: true};
    case 'no_garant':
      return {...state,subscriptionGranted: false};
    default:
      throw new Error();
  }
}
/**
 * Componente principal de la aplicación
 */

export default function AppLayout ({ children }: any) {
  const dispatch = useDispatch<AppDispatch>()
  const { subscriptionGranted, userChecked } = useGuardPermissions()

  const router = useRouter()
  useEffect(() => {
    onChangeAuthState(async (user: any) => {
      if (user) {
        await dispatch(createUser({ uid: user.uid, extradata: user.extradata }))
      } else {
        await dispatch(createUser({ uid: 'not-logged' }))
      }
      dispatch(setLoading(false))
      dispatch(setAuthLoading(false))
    })
  }, [])

  useEffect(() => {
    //console.log('subscriptionGranted', subscriptionGranted)
  }, [subscriptionGranted, userChecked])

  const _goSubscription = () => router.push('/subscription')
  const _goBack = () => router.back()
  const MemoizedLayout = React.memo(AppLayoutView)
  return (
    <MemoizedLayout
      goBack={_goBack}
      goSubscription={_goSubscription}
      alertSubscription={!subscriptionGranted && userChecked}
    >
      {children}
    </MemoizedLayout>
  )
}



export const AppLayoutView = ({
  children,
  alertSubscription,
  goSubscription,
  goBack
}: any) => {
  const [permisssioState, dispatch] = useReducer(reducerPermission, initialState);

  
  return (
    <div>
      <SubscriptionGranted.Provider value={dispatch}>
      <Drawer>{children}</Drawer>
        <AlertApp
          onCancel={() => goBack()}
          onAction={() => goSubscription()}
          visible={!permisssioState.subscriptionGranted || alertSubscription}
          title='subscription.user.unauthorized.alert.title'
        >
          {
            <div>
              <p>
                <FormattedMessage id='Para acceder a este contenido necesitas suscribirte a uno de los planes que lo habilite' />
              </p>
            </div>
          }
        </AlertApp>
      </SubscriptionGranted.Provider>
    </div>
  )
}
