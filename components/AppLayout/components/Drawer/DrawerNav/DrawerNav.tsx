

import Menu from 'components/Menu'
import style from './DrawerNav.module.scss'
import {mainMenuItems} from "ui/utils/mainMenu.config"
import { useRouter } from 'next/router'
import { string } from 'yup'
import Image from 'next/image'
import logoPastore from '../../../../../assets/img/logo-pastore.svg'


const DrawerNav = ({ children }: any) => {
  const router = useRouter()
  // console.log(router.pathname)
  //       console.log(router.query)
  const routeUrl = router.pathname;
  const activeItem = mainMenuItems.find(item => routeUrl.includes(item.path))
  return <DrawerNavView activeItem={activeItem?.path}>{children}</DrawerNavView>
}

/**
 * Función principal del componente DrawerNav que renderiza el contenido principal del Drawer
*/

const DrawerNavView = ({ children, activeItem } : { children:any, activeItem?:string }) => {
  return (
    <div className={style.drawerNav}>
      <aside className={style.aside}>
        {children}
        <div className={style.logoApp}>
          <Image src={logoPastore} alt='' />
        </div>
        <div className={style.menuContainer}>
          <Menu itemList={mainMenuItems} activeItem={activeItem} />
        </div>
      </aside>
    </div>
  )
}

export default DrawerNav