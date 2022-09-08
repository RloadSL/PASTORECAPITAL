import Card from 'components/Card'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import { useSystem } from 'ui/hooks/system.hooks'
import style from './RecoverPassword.module.scss'

const RecoverPasswordPage: NextPage = () => {
  const router = useRouter()
  const { isLogged, authError, loadingState } = useAuthentication()
  const { setLoadingState, pushErrorsApp } = useSystem()
 
 
  return <RecoverPasswordView></RecoverPasswordView>
}

const RecoverPasswordView = () => {
  return (
    <div className={style.recoverPasswordPage}>
      <div className={style.mainContainer}>
        <Card>

        </Card>
      </div>
    </div>
  )
}

export default RecoverPasswordPage
