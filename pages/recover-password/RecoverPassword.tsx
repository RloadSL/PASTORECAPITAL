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
import { CODEVALIDATIONSTATE } from 'ui/redux/slices/authentication/autentication.slice'
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
  const { isLogged, authError, loadingState, codeValidatedState, setCodeState} = useAuthentication()
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

  useEffect(() => {
    if (codeValidatedState === 'redirect') {
      router.push('/login')
      setCodeState('init')
    }
  }, [codeValidatedState])
  
  return <RecoverPasswordView codeValidatedState={codeValidatedState} setCodeState={setCodeState}/>
}


const RecoverPasswordView = ({codeValidatedState, setCodeState}:{codeValidatedState:CODEVALIDATIONSTATE, setCodeState:Function}) => {
  const [email, setEmail]:[email?:string, setEmail?:Function] = useState()
  const renderState = useCallback((processState: CODEVALIDATIONSTATE) => {
    switch (processState) {
      case 'init':
        return (
          <Suspense>
            <SendCodeMail onSend={(email:string) => { setEmail(email)}}/>
          </Suspense>
        )
      case 'waiting':
        return (
          <Suspense>
          { email ? <ValidateSecurityCode  email={email}/> : null}
          </Suspense>
        )
      case 'validated':
        return (
          <Suspense>
            {email ? <SetPassword email={email}/> : null}
          </Suspense>
        )
      default:
        break
    }
  }, [email])


 const _handleCodeState = ()=>{
      if(codeValidatedState === 'waiting' && email != undefined){
        return <div style={{display:'flex', width:'100%'}}>
          <button onClick={()=>setCodeState('init')}>PREVIEW</button>
        </div>
      }
      if(codeValidatedState === 'validated' && email != undefined){
        return <div style={{display:'flex', width:'100%'}}>
          <button onClick={()=>setCodeState('waiting')}>PREVIEW</button>
        </div>
      }
  }

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
          <br />
          <br />
          {_handleCodeState() }
          {renderState(codeValidatedState)}
        </Card>
      </div>
    </div>
  )
}

export default RecoverPasswordPage
