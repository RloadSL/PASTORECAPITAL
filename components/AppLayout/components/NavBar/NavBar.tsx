import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'ui/redux/slices/authentication/autentication.slice'
import { getIsLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import styles from './NavBar.module.scss'

const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const _signOutUser = () => dispatch(signOut());
  const isLogged = useSelector(getIsLogged);
  
  const router = useRouter();
  const titlePage =
    router.route !== '/' ? router.route.replace('/', '') : 'home';

  return (
    <NavBarView
      signOut={isLogged ? () => _signOutUser() : undefined}
      linkToSignIn={!isLogged ? router.route !== '/login' : undefined}
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
  linkToSignIn?: boolean
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

export default NavBar;