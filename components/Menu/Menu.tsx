import { User } from 'domain/User/User'
import { useSelector } from 'react-redux'
import { getIsLogged, getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import MenuItem from './components/MenuItem'
import style from './Menu.module.scss'

interface MENUPROPS {
  itemList: Array<any>
  activeItem?: string
  userLoggued?: User
}

/**
 * Función principal del componente Menú
 * @param itemList Listado de items del menú
 * @param activeItem Item activo del menú
 * @returns
 */

const Menu = ({ itemList, activeItem }: MENUPROPS) => {
  const userLoggued = useSelector(getUserLogged)
  return (
    <MenuView
      userLoggued={userLoggued}
      itemList={itemList}
      activeItem={activeItem}
    />
  )
}

/**
 * Función principal del render
 **/

const MenuView = ({ itemList, activeItem, userLoggued }: MENUPROPS) => {
  return (
    <ul className={style.menuContainer}>
      {itemList?.map((item, index) => {
        if (item.isAdministrator) {
          return userLoggued?.role.level === 2 ? <MenuItem key={index} item={item} activeItem={activeItem} /> : null
        }else{
          return <MenuItem key={index} item={item} activeItem={activeItem} />
        }
      })}
    </ul>
  )
}

export default Menu
