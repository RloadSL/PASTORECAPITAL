import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import styles from './NavBar.module.scss'

const NavBar = () => {
  //const { isLogged, signOutUser } = useAuthentication()
  const router = useRouter()
  const titlePage =
    router.route !== '/' ? router.route.replace('/', '') : 'home'
    console.log('NavBar')
 /*  useEffect(() => {
    console.log('NavBar')
    console.log(isLogged)
  }, [isLogged] )*/
    
  return (
    <NavBarView
      signOut={false ? () => null : undefined}
      linkToSignIn={router.route !== '/login'}
      back={router.route !== '/' ? router.back : undefined}
      titlePage={`page.${titlePage}.title`}
    />
  )
}

const NavBarView = ({
  back,
  signOut,
  titlePage,
  linkToSignIn
}: {
  back?: Function
  titlePage?: string
  linkToSignIn: boolean
  signOut?: Function
}) => {
  return (
    <div className={styles['navbar-container']}>
      {back && (
        <div className={styles['navbar-back']}>
          <button onClick={() => back()}>
            <FormattedMessage id='component.navbar.backbuttom' />
          </button>
        </div>
      )}
      {titlePage && (
        <div className={styles['navbar-title']}>
          <FormattedMessage id={titlePage} />
        </div>
      )}
      <div className={styles['navbar-item']}></div>
      {linkToSignIn && (
        <Link href={'/login'}>
          <a>
            <FormattedMessage id='component.navbar.signUpBtn' />
          </a>
        </Link>
      )}
      {signOut && (
        <button onClick={() => signOut()}>
          <FormattedMessage id='component.navbar.signOutBtn' />
        </button>
      )}
    </div>
  )
}

export default React.memo(NavBar);