

import Menu from 'components/Menu'
import style from './DrawerNav.module.scss'
import { mainMenuItems } from "ui/utils/mainMenu.config"
import { useRouter } from 'next/router'
import Image from 'next/image'
import logoPastore from '../../../../../assets/img/logo-pastore.svg'
import logoMobile from '../../../../../assets/img/logo-image.svg'
import { useEffect, useState } from 'react'
import MenuCollapsable from 'components/MenuCollapsable'


const DrawerNav = ({ children }: any) => {
  const router = useRouter()
  const routeUrl = router.pathname;
  
  
  
  const [windowSize, setWindowSize] = useState({ innerWidth: 0, innerHeight: 0 });
  const [activeItem, setActiveItem] = useState<any>('/')

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setWindowSize({ innerWidth, innerHeight });
    const handleWindowResize = () => {
      const { innerWidth, innerHeight } = window;
      setWindowSize({ innerWidth, innerHeight });
    }
    window.addEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    const active = router.route === '/' ? mainMenuItems[0] : mainMenuItems.find(item => router.route.includes(item.path));
    console.log(active)
    setActiveItem(active)
  }, [router.route])
  

  return <DrawerNavView windowSize={windowSize} activeItem={activeItem?.path}>{children}</DrawerNavView>
}

/**
 * Función principal del componente DrawerNav que renderiza el contenido principal del Drawer
*/

const DrawerNavView = ({ children, activeItem, windowSize }: { children: any, activeItem?: string, windowSize: any }) => {

  const isCollapsed = (isOpen:boolean) => {
    let bodyContainer = document.querySelector('body');
    if (bodyContainer) {
      if (isOpen === true) {
        bodyContainer.style.overflow = 'hidden';
      } else {
        bodyContainer.style.overflow = 'auto';
      }
    }
  }

  return windowSize.innerWidth > 0 ?  (<div className={style.drawerNav}>
      {windowSize.innerWidth >= 1080 && windowSize.innerWidth < 1200 ? (
        <div className={style.logoTablet}>
          <Image src={logoPastore} alt='Logotipo Pastore Capital' />
        </div>
      ) : windowSize.innerWidth < 1080 ? (
      <div className={style.logoMobile}>
        <Image src={logoMobile} alt='Logotipo Pastore Capital' /></div>
      ) : null
      }
      {windowSize.innerWidth >= 1200 ? (
        <aside className={style.aside}>
          {children}
          <div className={style.logoApp}>
            <Image src={logoPastore} alt='' />
          </div>
          <div className={style.menuContainer}>
            <Menu itemList={mainMenuItems} activeItem={activeItem} />
          </div>
        </aside>) : (
        <MenuCollapsable isCollapsed={isCollapsed}>
          <div className={`${style.innerContent} flex-container`}>
            {windowSize.innerWidth >= 1200 ? <div className={style.logoApp}><Image src={logoPastore} alt='' /></div> : null}
            <div className={style.menuContainer}>
              <Menu itemList={mainMenuItems} activeItem={activeItem} />
            </div>
          </div>
        </MenuCollapsable>
      )}
    </div>
  ) : <></>
}

export default DrawerNav