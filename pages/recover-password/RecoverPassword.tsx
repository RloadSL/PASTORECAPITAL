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
import { FormattedMessage } from 'react-intl'
const ValidateSecurityCode = dynamic(
  () => import('./components/ValidateSecurityCode'),
  {
    suspense: true
  }
)
const SetPassword = dynamic(() => import('./components/SetPassword'), {
  suspense: true
})
const RecoverPasswordPage: NextPage = () => {
  const router = useRouter()
  const { isLogged, authError, loadingState } = useAuthentication()
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
    }
  })

  console.log('RENDER RECOVER PASS')
  return <RecoverPasswordView />
}
type PROCESSSTATE = 'sending_email' | 'validate_code' | 'updating_password'
const RecoverPasswordView = () => {
  const [processState, setprocessState]: [PROCESSSTATE, Function] = useState(
    'sending_email'
  )

  const renderState = useCallback((processState: PROCESSSTATE) => {
    switch (processState) {
      case 'sending_email':
        return (
          <Suspense>
            <SendCodeMail />
          </Suspense>
        )
      case 'validate_code':
        return (
          <Suspense>
            {' '}
            <ValidateSecurityCode />
          </Suspense>
        )
      case 'updating_password':
        return (
          <Suspense>
            {' '}
            <SetPassword />
          </Suspense>
        )
      default:
        break
    }
  }, [])

  return (
    <div className={style.recoverPasswordPage}>
      <div className={style.mainContainer}>
        <Card>
          <div style={{ marginBottom: 20 }}>
            <p>
              <FormattedMessage id='page.recover-password.title' />
            </p>
            <Link href={'/login'}>
              {/* @maria poner traducción */}
              <a>Volver</a>
            </Link>
          </div>
          <button onClick={() => setprocessState('sending_email')}>SET</button>
          <button onClick={() => setprocessState('validate_code')}>SET</button>
          <button onClick={() => setprocessState('updating_password')}>
            SET2
          </button>
          <br />
          <br />
          {renderState(processState)}
        </Card>
      </div>
    </div>
  )
}

export default RecoverPasswordPage
