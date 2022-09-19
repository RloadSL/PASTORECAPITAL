import Menu from 'components/Menu'
import style from './DrawerNav.module.scss'
import {mainMenuItems} from "ui/utils/mainMenu.config"


/**
 * Función principal del componente DrawerNav que renderiza el contenido principal del Drawer
 */

const DrawerNav = ({ children }: any) => {
  return (
    <div className={style.drawerNav}>
      <aside className={style.aside}>
        {children}
        <div className={style.menuContainer}>
          <Menu itemList={mainMenuItems} />
        </div>
      </aside>
    </div>
  )
}

export default DrawerNav