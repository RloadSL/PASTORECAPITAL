

import Menu from 'components/Menu'
import style from './DrawerNav.module.scss'
import { mainMenuItems } from "ui/utils/mainMenu.config"
import { useRouter } from 'next/router'
import { string } from 'yup'
import Image from 'next/image'
import logoPastore from '../../../../../assets/img/logo-pastore.svg'
import logoMobile from '../../../../../assets/img/logo-image.svg'
import DrawerMenu from 'components/SideCollapsable'
import SideCollapsable from 'components/SideCollapsable'
import { useEffect, useState } from 'react'


const DrawerNav = ({ children }: any) => {
  const router = useRouter()
  const routeUrl = router.pathname;
  const activeItem = mainMenuItems.find(item => routeUrl.includes(item.path))
  const [windowSize, setWindowSize] = useState({ innerWidth: 0, innerHeight: 0 });

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setWindowSize({ innerWidth, innerHeight });
    const handleWindowResize = () => {
      const { innerWidth, innerHeight } = window;
      setWindowSize({ innerWidth, innerHeight });
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return <DrawerNavView windowSize={windowSize} activeItem={activeItem?.path}>{children}</DrawerNavView>
}

/**
 * Función principal del componente DrawerNav que renderiza el contenido principal del Drawer
*/

const DrawerNavView = ({ children, activeItem, windowSize }: { children: any, activeItem?: string, windowSize: any }) => {
  return (
    <div className={style.drawerNav}>
      {windowSize.innerWidth >= 1080 && windowSize.innerWidth <= 1200 ? <div className={style.logoMobile}><Image src={logoPastore} alt='' /></div> : windowSize.innerWidth < 1080 ? <div className={style.logoMobile}><Image src={logoMobile} alt='' /></div> : null}
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
        <SideCollapsable>
          <div className={`${style.innerContent} flex-container`}>
            {windowSize.innerWidth >= 1200 ? <div className={style.logoApp}><Image src={logoPastore} alt='' /></div> : null}
            <div className={style.menuContainer}>
              <Menu itemList={mainMenuItems} activeItem={activeItem} />
            </div>
          </div>
        </SideCollapsable>
      )}
    </div>
  )
}

export default DrawerNav