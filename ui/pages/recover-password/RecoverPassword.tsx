/* eslint-disable react-hooks/exhaustive-deps */
import style from './RecoverPassword.module.scss'
import Card from 'components/Card'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import { useSystem } from 'ui/hooks/system.hooks'
import SendCodeMail from './components/SendCodeMail'
import Link from 'next/link'
import { CODEVALIDATIONSTATE } from 'ui/redux/slices/authentication/autentication.slice'
import logo from "../../../assets/img/logo-w.svg";
import Image from 'next/image'

const ValidateSecurityCode = dynamic(
  () => import('./components/ValidateSecurityCode'),
  {
    suspense: true
  }
)
const SetPassword = dynamic(() => import('./components/SetPassword'), {
  suspense: true
})


/**
 * Función del componente RecoverPasswordPage
 * @returns 
*/

const RecoverPasswordPage: NextPage = () => {
  const router = useRouter()
  const { isLogged, authError, loadingState, codeValidatedState, setCodeState, cleanError } = useAuthentication()
  const { setLoadingState, pushErrorsApp } = useSystem()

  useEffect(() => {
    if (isLogged) router.push('/')
  }, [router, isLogged])

  useEffect(() => {
    setLoadingState(loadingState)
  }, [loadingState])

  useEffect(() => {
    if (authError?.errorCode) {
      pushErrorsApp(authError)
      cleanError()
    }
  }, [authError])

  useEffect(() => {
    if (codeValidatedState === 'redirect') {
      router.push('/login')
      setCodeState('init')
    }
  }, [codeValidatedState])

  return <RecoverPasswordView codeValidatedState={codeValidatedState} setCodeState={setCodeState} />
}

/**
 * Función del componente RecoverPasswordView
 * @param codeValidatedState Estado del código de validación
 * @param setCodeState Seteo del código validación
 * @returns 
*/

const RecoverPasswordView = ({ codeValidatedState, setCodeState }:{ codeValidatedState: CODEVALIDATIONSTATE, setCodeState: Function }) => {
  const [email, setEmail]: [email?: string, setEmail?: Function] = useState()
  const renderState = useCallback((processState: CODEVALIDATIONSTATE) => {
    switch (processState) {
      case 'init':
        return (
          <Suspense>
            <SendCodeMail onSend={(email: string) => { setEmail(email) }} />
          </Suspense>
        )
      case 'waiting':
        return (
          <Suspense>
            {email ? <ValidateSecurityCode email={email} /> : null}
          </Suspense>
        )
      case 'validated':
        return (
          <Suspense>
            {email ? <SetPassword email={email} /> : null}
          </Suspense>
        )
      default:
        break
    }
  }, [email])

  return (
    <div className={style.recoverPasswordPage}>
      <div className={style.recoverPasswordBottom}>
        <div className={style.logo}>
          <Image src={logo} alt="Pastore Capital logo" />
        </div>
        <div className={style.mainContainer}>
          <Card>
            <div className={style.cardContainer}>
              <Link href={'/login'} >
                <a className={style.back} onClick={() => setCodeState('init')}></a>
              </Link>
              {renderState(codeValidatedState)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default RecoverPasswordPage
