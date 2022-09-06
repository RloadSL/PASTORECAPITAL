/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorAuth } from 'infrastructure/firebase/authentication.firebase'
import { NextPage } from 'next'
import Link from 'next/link'
import {useMemo } from 'react'
import { useAuthentication } from '../../ui/hooks/authentication.hook'
import SignInForm from './components/SignInForm'
interface LOGINVALUE {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const { signIn, authError , cleanError} = useAuthentication()
  const _onSubmit = (value: LOGINVALUE) => {
    cleanError()
    signIn(value)
  }

  useMemo(()=>{
    if(authError.length > 0) {
     setTimeout(() => {
       cleanError()
     }, 2000);
    }
  }, [authError.length])


  return (
    <LoginPageView
      onSubmit={(value: LOGINVALUE) => _onSubmit(value)}
    />
  )
}

const LoginPageView = ({
  onSubmit,
  errors
}: {
  onSubmit: Function
  errors?: ErrorAuth[]
}) => {
 
  return (
    <div className='container'>
      <SignInForm
        onSubmit={(value: { email: string; password: string }) =>
          onSubmit(value)
        }
      />
      <div>
        <Link href={'/sign-up'}>SignUp</Link>
      </div>
      {errors && errors.length > 0 && errors.map((e, key) => <p key={key}>{e.errorCode}</p>)}
    </div>
  )
}

export default LoginPage
