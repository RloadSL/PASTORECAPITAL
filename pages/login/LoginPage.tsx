
import style from "./LoginPage.module.scss";
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../ui/hooks/authentication.hook'

import { FormattedMessage } from 'react-intl'

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Card from "components/Card";





/**
 * Función principal de Login page
 */
const LoginPage: NextPage = () => {
  const router = useRouter()
  const { isLogged } = useAuthentication()

  useEffect(() => {
    if (isLogged) router.push('/')
  }, [router, isLogged])

  return (
    <LoginPageView/>
  )
}

/**
 * Función de renderizado del componente * @returns
 */

const LoginPageView = () => {
  const [viewForm, setviewForm] = useState(1)
  return (
    <div className={style.loginPage}>
      <div className={style.mainContainer}>
        <div className={style.colLeft}>
          <h1 className={style.loginTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing
          </h1>
        </div>
        <div className={style.colRight}>
          <Card>
          <button onClick={()=>setviewForm(viewForm !== 1 ? 1 : 2)}>{viewForm !== 1 ? 'SignIn' : 'SignUp'}  </button>

            {viewForm === 1 ? <SignIn/> : <SignUp/>}  
          </Card>
         
        </div>
      </div>

    </div>
  )
}

export default LoginPage
