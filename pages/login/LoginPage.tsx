/* eslint-disable react-hooks/exhaustive-deps */

import style from './LoginPage.module.scss'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import { useAuthentication } from '../../ui/hooks/authentication.hook'
import { FormattedMessage } from 'react-intl'
import SignIn from './components/SignIn'
import Card from 'components/Card'
import { useSystem } from 'ui/hooks/system.hooks'
import dynamic from 'next/dynamic'
const SigUp = dynamic(() => import('./components/SignUp'), {
  suspense: true
})
/**
 * Función principal de Login page
 */
const LoginPage: NextPage = () => {
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
  }, [authError])
  console.log('RENDER LOGIN')
  return <LoginPageView />
}

/**
 * Función de renderizado del componente * @returns
 */

const LoginPageView = () => {
  const [viewForm, setviewForm] = useState(1)
  const user = 'Eric'

  return (
    <div className={style.loginPage}>
      <div className={style.mainContainer}>
        <div className={style.colLeft}>
          <h1 className={style.mainTitle}>
            {viewForm !== 1 ? (
              <span>
                <FormattedMessage
                  id='page.login.mainTitleSignUp'
                  values={{
                    b: children => <strong>{children}</strong>
                  }}
                />
              </span>
            ) : (
              <span>
                <FormattedMessage
                  id='page.login.mainTitleLogin'
                  values={{
                    b: children => <strong>{children}</strong>
                  }}
                />
              </span>
            )}
          </h1>
        </div>
        <div className={style.colRight}>
          <Card>
            <button onClick={() => setviewForm(viewForm !== 1 ? 1 : 2)}>
              {viewForm !== 1 ? 'SignIn' : 'SignUp'}{' '}
            </button>
            {viewForm === 1 ? (
              <SignIn />
            ) : (
              <Suspense>
                <SigUp />
              </Suspense>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
