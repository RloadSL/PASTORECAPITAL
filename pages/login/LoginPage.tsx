/* eslint-disable react-hooks/exhaustive-deps */

import style from './LoginPage.module.scss'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import { useAuthentication } from '../../ui/hooks/authentication.hook'
import { FormattedMessage } from 'react-intl'
import SignIn from "./components/SignIn";
import Card from "components/Card";
import { useSystem } from "ui/hooks/system.hooks";
import dynamic from "next/dynamic";
import logo from "../../assets/img/logo-w.svg";
import ButtonApp from "components/ButtonApp";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


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
  const [viewForm, setviewForm] = useState(0)  
  const [tabIndex, setTabIndex] = useState(0);


  return (
    <div className={style.loginPage}>
      <div className={style.mainContainer}>
        <div className={style.colLeft}>
          <div className={style.colContainer}>
            <div className={style.logo}>
              <Image src={logo} alt="Pastore Capital logo" />
            </div>
            <div className={style.titleContainer}>
              <h1 className={style.mainTitle}>
                <span>
                  <FormattedMessage
                    id={viewForm !== 1 ? "page.login.mainTitleSignUp" : "page.login.mainTitleLogin"}
                    values={{
                      b: children => <strong>{children}</strong>
                    }}
                  />
                </span>
              </h1>
              <p>
                nsequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatis um zzril delenit augue duis dolore te feugait null
              </p>
            </div>
          </div>
        </div>
        <div className={style.colRight}>
          <Card customStyle={style.cardContainer}>
            <Tabs className={style.tabContainer} selectedIndex={tabIndex} onSelect={(index) => {
              setviewForm(viewForm !== 1 ? 1 : 0)
              setTabIndex(index);
              }}>
              <TabList className={style.loginFormButtons}>
                <Tab selectedClassName={style.tabSelect} className={style.customTab}>
                  <ButtonApp buttonStyle={"tab"} type="button" labelID="page.login.labelSignIn"/>
                </Tab>
                <Tab selectedClassName={style.tabSelect} className={style.customTab}>
                  <ButtonApp buttonStyle={"tab"} type="button" labelID="page.login.labelSignUp"/>
                </Tab>
              </TabList>
              <div className={style.loginFormContainer}>
              <TabPanel>
                <SignIn />
              </TabPanel>
              <TabPanel>
                <Suspense><SigUp /></Suspense>
              </TabPanel>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
