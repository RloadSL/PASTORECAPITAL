import Breadcrumbs from 'components/Breadcrumbs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'ui/redux/slices/authentication/autentication.slice'
import { getIsLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import style from './NavBar.module.scss'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'


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
      {false && (
        <Link href={'/login'}>
          <a className={style.loginLink}>
            <FormattedMessage id='component.navbar.signUpBtn' />
          </a>
        </Link>
      )}
      {true && (
        // <button onClick={() => signOut()}>
        //   <FormattedMessage id='component.navbar.signOutBtn' />
        // </button>
        <div>

          <div>
            notificaciones
          </div>
          <div>
            <p>Luis López</p>
          </div>
          <Menu
          align='end'
          offsetY={5}
          menuButton={
            <button className='menu-options-btn'>
              <span className='only-readers'>opciones</span>
            </button>}
        >
          <MenuItem onClick={() => console.log('hola')}>Editar</MenuItem>
          <MenuItem onClick={()=>console.log('adios')}>Eliminar</MenuItem>
        </Menu>
        </div>

      )}
    </div>
  )
}

export default NavBar;