/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useReducer, useRef } from 'react'
import Image from 'next/image'
import Drawer from './components/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import alertImg from '../../assets/img/alert.png'
import style from './AppLayout.module.scss'

import {
  createUser,
  onChangeAuthState,
  setAuthLoading,
  setUserLogged
} from 'ui/redux/slices/authentication/autentication.slice'
import { AppDispatch } from 'ui/redux/store'
import { useRouter } from 'next/router'
import AlertApp from 'components/AlertApp'
import { FormattedMessage } from 'react-intl'
import { setLoading } from 'ui/redux/slices/system/system.slice'
import userConsultantRepository from 'infrastructure/repositories/userConsultant.repository'
import { setCurrentConsultant } from 'ui/redux/slices/tax-consultants/tax-consultants.slice'
import { NOT_CONSULTANT } from 'domain/UserConsultant/UserConsultant'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { User } from 'domain/User/User'
import { useGuardPermissions } from 'ui/hooks/guard.permissions.hook'
import { isEqual } from 'lodash'

export const SubscriptionGranted = createContext<any>(null)

/**
 * Componente principal de la aplicación
 */

export default function AppLayout ({ children }: any) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const userLogged = useSelector(getUserLogged)
  const unsub = useRef<any | undefined>()
  const { permisssioState, dispatchPermission, setUserPlanKey , checkPermissions} =
    useGuardPermissions()

  useEffect(() => {
    if (!userLogged) {
      onChangeAuthState(async (user: any) => {
        if (user) {
          await dispatch(
            createUser({ uid: user.uid, extradata: user.extradata })
          )
        } else {
          await dispatch(createUser({ uid: 'not-logged' }))
        }
        _handleColaborators(user?.uid)
        dispatch(setLoading(false))
        dispatch(setAuthLoading(false))
      })
    } else {
      if (unsub.current) unsub.current()
      unsub.current = userLogged.onChange((user: User) => {
        if (
          userLogged.subscription.plan.level != user.subscription.plan.level
        ) {
          dispatch(setUserLogged(user))
        }

        if (userLogged.stripe_cu_id != user.stripe_cu_id) {
          dispatch(setUserLogged(user))
        }

        if (userLogged.collaboration && Object.keys(userLogged.collaboration).length != Object.keys(user.collaboration).length) {
          console.log('CAMBIOS EN EL USUARIO LOGADO EN COLLABORATION')
          dispatch(setUserLogged(user))
        }
      })
    }
  }, [userLogged])

  const _handleColaborators = async (uid?: string) => {
    if (uid) {
      const userConsultant =
        await userConsultantRepository.getUserConsultantByUID(uid)
      if(userConsultant?.state === 'active'){
        dispatch(setCurrentConsultant(userConsultant || NOT_CONSULTANT))
      }else dispatch(setCurrentConsultant(NOT_CONSULTANT))
      
    } else {
      dispatch(setCurrentConsultant(undefined))
    }
  }

  const _goSubscription = () => router.push('/subscription')
  const _goBack = () => router.back()
  const MemoizedLayout = React.memo(AppLayoutView)
  return (
    <MemoizedLayout
      permisssioState={permisssioState}
      goBack={_goBack}
      goSubscription={_goSubscription}
    >
      <SubscriptionGranted.Provider value={dispatchPermission}>
        {children}
      </SubscriptionGranted.Provider>
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
        <FormattedMessage id='subscription.user.unauthorized.alert.content' />
      </p>
    </div>
  )
}

export const AppLayoutView = ({
  children,
  permisssioState,
  goSubscription,
  goBack
}: any) => {
  return (
    <div>
      <Drawer>{children}</Drawer>
      <AlertApp
        onCancel={() => goBack()}
        onAction={() => goSubscription()}
        visible={!permisssioState.subscriptionGranted}
        title='subscription.user.unauthorized.alert.title'
        cancelButton={false}
      >
        {blockUserContent()}
      </AlertApp>
    </div>
  )
}
