import Breadcrumbs from 'components/Breadcrumbs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'ui/redux/slices/authentication/autentication.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import style from './NavBar.module.scss'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import Notifications from 'components/Notifications'
import useWindowSize from 'ui/hooks/windowSize.hook'
import ButtonApp from 'components/ButtonApp'
import Translate from 'domain/Translate/Translate'
import esFlag from '../../../../assets/img/icons/es.png'
import enFlag from '../../../../assets/img/icons/en.png'

/**
 * OJO crear un interface
 * @returns 
 */
const NavBar = () => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch<AppDispatch>()
  const [hasNoti, setnotis] = useState<boolean>(false)
  const user = useSelector(getUserLogged)
  const { limitTextLength } = useComponentUtils()
  const router = useRouter()
  

  const _signOutUser = () => {
    router.push('/');
    dispatch(signOut())
  }
  useEffect(()=>{
    if(user){
      user.onChangeNotifications((change:any)=>{
        setnotis(!change.new_notifications ? false : change.new_notifications)
      })
    }
  },[user])

  return (
    <NavBarView
      hasNoti={hasNoti}
      userName={user && user.uid != 'not-logged' ? limitTextLength(100, `${user?.name} ${user?.lastname}`) : undefined}
      userRole={user && user.uid != 'not-logged' ? user.role.label : undefined}
      userPlan={user && user.uid != 'not-logged' ? user.subscription?.plan.label : undefined}
      signOut={user && user.uid != 'not-logged' ? () => _signOutUser() : () => null}
      linkToSignIn={!user ? router.route !== '/login' : undefined}
      back={router.route !== '/' ? router.back : undefined}
      windowSize={windowSize}
      uid={user?.uid}
    />
  )
}

const NavBarView = ({
  back,
  signOut,
  userName,
  userRole,
  userPlan,
  windowSize,
  uid,
  hasNoti
}: {
  back?: Function
  userName?: string
  linkToSignIn?: boolean
  signOut: Function,
  userRole?: string,
  userPlan?: string
  windowSize: any,
  uid: string,
  hasNoti: boolean
}) => {
  const { push, pathname, asPath, query, locale  } = useRouter()
  const switchLocal = ()=>{
    const newlocale =  locale === 'es' ? 'en' : 'es'
    push({ pathname, query }, asPath, { locale: newlocale})
    Translate.currentLocal = newlocale;
  }
  return (
    <div className={style.navbarContainer}>
      <div className={style.backButton}>
        <button onClick={() => back ? back() : null}>
          <span className='only-readers'><FormattedMessage id='component.navbar.backbuttom' /></span>
        </button>
      </div>
      
      {/* <div className={style['navbar-item']}></div> */}
      <div className={style.leftContainer}>
        <div className={style.buttonContainer}>
          {userRole != 'Administrator' && <Link href={'/subscription'}>
            <a className={style.subscribeBtn}>
              <span>
                <FormattedMessage id= {userPlan === 'Guest' ? 'btn.subscribe' : 'btn.update_subscribe'} />
              </span>
            </a>
          </Link>}
        </div>
        {userName && (
          <div className={`${style.userInfoContainer} flex-container`}>
            <Link href={`/users/${uid}/notifications`}>
              <a>
                <Notifications hasNotifications={hasNoti} />
              </a>
            </Link>
            <div className='flex-container'>
              <div className={style.userInfo}>
                <p className={style.userInfo_name}>{userName || ''}</p>
                <p className={style.userProfile}><FormattedMessage id={`role.${userRole}`} /> {userRole === 'User' && <FormattedMessage id={`plan.${userPlan}`} />}</p>
              </div>
              <div className={style.optionsMenu}>
                <Menu
                  align='end'
                  offsetY={5}
                  menuButton={
                    <button className={style.optionsButton}>
                      <span className='only-readers'>opciones</span>
                    </button>
                  }
                >
                  <MenuItem onClick={()=>push(`/users/${uid}`)}><FormattedMessage id='component.navbar.profile' /></MenuItem>
                  <MenuItem onClick={()=>push(`/users/${uid}/invoices`)}>
                    <FormattedMessage id='component.navbar.invoices' />
                  </MenuItem>
                  <MenuItem onClick={()=>push(`/support`)}>
                    <FormattedMessage id='support' />
                  </MenuItem>
                  <MenuItem onClick={() => signOut()}>
                    <FormattedMessage id='component.navbar.signOutBtn' />
                  </MenuItem>
                  
                </Menu>
              </div>
            </div>
          </div>
        )}
        {!userName && (
          <Link href={{ pathname: `/login`, query: {redirect:asPath}}}>
            <a className={style.loginLink}>
              <FormattedMessage id='component.navbar.signUpBtn' />
            </a>
          </Link>
        )}
        <div className={style.languageButton}>
          <ButtonApp onClick={switchLocal} buttonStyle={'link'} size={'small'} icon={locale === 'en' ? esFlag : enFlag}>
            {locale === 'en' ? 'ES' : 'EN'}
          </ButtonApp>
        </div>
      </div>
      
    </div>
  )
}

export default NavBar
