import { useSelector } from 'react-redux'
import { getIsLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import MenuItem from './components/MenuItem'
import style from './Menu.module.scss'

interface MENUPROPS {
  itemList: Array<any>
  activeItem?: string
  isLoagged: boolean
}

/**
 * Función principal del componente Menú
 * @param itemList Listado de items del menú
 * @param activeItem Item activo del menú
 * @returns
 */

const Menu = ({ itemList, activeItem }: MENUPROPS) => {
  const isLoagged = useSelector(getIsLogged)
  return (
    <MenuView
      isLoagged={isLoagged}
      itemList={itemList}
      activeItem={activeItem}
    />
  )
}

/**
 * Función principal del render
 **/

const MenuView = ({ itemList, activeItem, isLoagged }: MENUPROPS) => {
  return (
    <ul className={style.menuContainer}>
      {itemList?.map((item, index) => {
        if (item.isAdministrator) {
          return isLoagged ? <MenuItem key={index} item={item} activeItem={activeItem} /> : null
        }else{
          return <MenuItem key={index} item={item} activeItem={activeItem} />
        }
      })}
    </ul>
  )
}

export default Menu
