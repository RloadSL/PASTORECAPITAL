/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useReducer } from 'react'
import Image from 'next/image'
import Drawer from './components/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import alertImg from '../../assets/img/alert.png'
import style from './AppLayout.module.scss'

import {
  createUser,
  onChangeAuthState,
  setAuthLoading
} from 'ui/redux/slices/authentication/autentication.slice'
import { AppDispatch } from 'ui/redux/store'
import { useRouter } from 'next/router'
import AlertApp from 'components/AlertApp'
import { FormattedMessage } from 'react-intl'
import { setLoading } from 'ui/redux/slices/system/system.slice'
import userConsultantRepository from 'infrastructure/repositories/userConsultant.repository'
import { setCurrentConsultant } from 'ui/redux/slices/tax-consultants/tax-consultants.slice'
import { NOT_CONSULTANT } from 'domain/UserConsultant/UserConsultant'

export const SubscriptionGranted = createContext<any>(null)
const initialState = { subscriptionGranted: true };

function reducerPermission(state: any, action: { garanted: 'garant' | 'no_garant' }) {
  switch (action.garanted) {
    case 'garant':
      return { ...state, subscriptionGranted: true };
    case 'no_garant':
      return { ...state, subscriptionGranted: false };
    default:
      throw new Error();
  }
}
/**
 * Componente principal de la aplicación
 */

export default function AppLayout({ children }: any) {
  const dispatch = useDispatch<AppDispatch>()
  //const { subscriptionGranted, userChecked } = useGuardPermissions()

  const router = useRouter()
  useEffect(() => {
    onChangeAuthState(async (user: any) => {
      if (user) {
        await dispatch(createUser({ uid: user.uid, extradata: user.extradata }))
      } else {
        await dispatch(createUser({ uid: 'not-logged' }))
      }
      _handleColaborators(user?.uid)
      dispatch(setLoading(false))
      dispatch(setAuthLoading(false))
    })
  }, [])

  const _handleColaborators = async (uid?:string) => {
    if(uid){
      const userConsultant = await userConsultantRepository.getUserConsultantByUID(uid)
      dispatch(setCurrentConsultant(userConsultant || NOT_CONSULTANT))
    }else{
      dispatch(setCurrentConsultant(undefined))
    }
    
  }

  const _goSubscription = () => router.push('/subscription')
  const _goBack = () => router.back()
  const MemoizedLayout = React.memo(AppLayoutView)
  return (
    <MemoizedLayout
      goBack={_goBack}
      goSubscription={_goSubscription}
    >
      {children}
    </MemoizedLayout>
  )
}

const blockUserContent = () => {
  return (
    <div className={style.alertMessageContent}>
      <div className={style.alertMessageContent_icon}>
        <Image src={alertImg} alt='Icono de alerta de usuario' />
      </div>
      <p>
        <FormattedMessage id='Parece que quieres acceder a este contenido. Actualiza tu plan de suscripción para tener acceso.' />
      </p>
    </div>
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
          visible={!permisssioState.subscriptionGranted || alertSubscription}
          title='subscription.user.unauthorized.alert.title'
          cancelButton={false}
        >
          {blockUserContent()}
        </AlertApp>
      </SubscriptionGranted.Provider>
    </div>
  )
}
