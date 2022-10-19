/* eslint-disable react-hooks/exhaustive-deps */

import style from './LoginPage.module.scss'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import SignIn from "./components/SignIn";
import Card from "components/Card";
import { useSystem } from "ui/hooks/system.hooks";
import dynamic from "next/dynamic";
import logo from "../../../assets/img/logo-w.svg";
import ButtonApp from "components/ButtonApp";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useAuthentication } from 'ui/hooks/authentication.hook'
import Loading from 'components/Loading'
import Modal from 'components/Modal'


const SigUp = dynamic(() => import('./components/SignUp'), {
  suspense: true
})

/**
 * Función del componente Login Page
 * @returns 
 */

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { isLogged, authError, loadingState, userCredential } = useAuthentication()
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
  return <LoginPageView userCredential={userCredential}/>
}

/**
 * Función de renderizado del componente 
 * * @returns
 */

const LoginPageView = ({userCredential}:any) => {
  const [viewForm, setviewForm] = useState(0)
  const [tabIndex, setTabIndex] = useState(0)
  const [visibleBuildingDashboard, setVisibleBuildingDashboard] = useState(false)
  useEffect(() => {
    if(userCredential) setVisibleBuildingDashboard(true)
  }, [userCredential])
  
  const renderBuildingDashboard = () => {
    return (
      <Modal>
        <div>
          Loading....
        </div>
      </Modal>
    )
  }
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
                    id={viewForm !== 0 ? "page.login.mainTitleSignUp" : "page.login.mainTitleLogin"}
                    values={{
                      b: children => <strong>{children}</strong>
                    }}
                  />
                </span>
              </h1>
              <p>
                <FormattedMessage
                  id={viewForm !== 0 ? "page.login.mainSubTitleSignUp" : "page.login.mainSubTitleLogin"}
                />
              </p>
            </div>
          </div>
        </div>
        <div className={style.colRight}>
          <Card>
            <div className={style.infoContainer}>
            <Loading />
            <Tabs className={style.tabContainer} selectedIndex={tabIndex} onSelect={(index) => {
              setviewForm(viewForm !== 1 ? 1 : 0)
              setTabIndex(index);
            }}>
              <TabList className={style.loginFormButtons}>
                <Tab selectedClassName={style.tabSelect} className={style.customTab}>
                  <ButtonApp buttonStyle={"tab"} type="button" labelID="page.login.labelSignIn" />
                </Tab>
                <Tab selectedClassName={style.tabSelect} className={style.customTab}>
                  <ButtonApp buttonStyle={"tab"} type="button" labelID="page.login.labelSignUp" />
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
            </div>
          </Card>
        </div>
      </div>
      { (visibleBuildingDashboard) && renderBuildingDashboard()}
    </div>
  )
}

export default LoginPage
