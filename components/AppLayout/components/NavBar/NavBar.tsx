import Breadcrumbs from 'components/Breadcrumbs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'ui/redux/slices/authentication/autentication.slice'
import {  getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import style from './NavBar.module.scss'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import { useComponentUtils } from 'ui/hooks/components.hooks'

const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const _signOutUser = () => dispatch(signOut())
  const user = useSelector(getUserLogged)
  const {limitTextLength} = useComponentUtils()
  const router = useRouter()
  const titlePage =
    router.route !== '/' ? router.route.replace('/', '') : 'home'

  return (
    <NavBarView
      userName={limitTextLength(20, `${user?.name} ${user.lastname}`)}
      signOut={user ? () => _signOutUser() : undefined}
      linkToSignIn={!user ? router.route !== '/login' : undefined}
      back={router.route !== '/' ? router.back : undefined}
    />
  )
}

const NavBarView = ({
  back,
  signOut,
  userName,
  linkToSignIn
}: {
  back?: Function
  userName?: string
  linkToSignIn?: boolean
  signOut?: Function
}) => {
  return (
    <div className={style.navbarContainer}>
      <Breadcrumbs />
      {/* {back && (
        <div className={styles['navbar-back']}>
          <button onClick={() => back()}>
            <FormattedMessage id='component.navbar.backbuttom' />
          </button>
        </div>
      )} */}

      <div className={style['navbar-item']}></div>
      {linkToSignIn && (
        <Link href={'/login'}>
          <a className={style.loginLink}>
            <FormattedMessage id='component.navbar.signUpBtn' />
          </a>
        </Link>
      )}
      {signOut && (
        <div>
          <div>notificaciones</div>
          <div>
            <p>{userName || ''}</p>
          </div>
          <Menu
            align='end'
            offsetY={5}
            menuButton={
              <button className='menu-options-btn'>
                <span className='only-readers'>opciones</span>
              </button>
            }
          >
            <MenuItem onClick={() => console.log('hola')}>Editar</MenuItem>
            <MenuItem onClick={() => console.log('adios')}>Eliminar</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  )
}

export default NavBar
