import MenuItem from "./components/MenuItem"
import style from './Menu.module.scss'

interface MENUPROPS {
  itemList: Array<any>
  activeItem?: string
}

/**
 * Función principal del componente Menú
 * @param itemList Listado de items del menú 
 * @returns 
 */

const Menu = ({ itemList, activeItem }: MENUPROPS) => {
  return <MenuView itemList={itemList} activeItem={activeItem} />
}

/**
 * Función principal del render
 */

const MenuView = ({ itemList, activeItem }: MENUPROPS) => {
  return (
    <ul className={style.menuContainer}>
      {itemList?.map((item, index) =>
        <MenuItem key={index} item={item} activeItem={activeItem} />
      )}
    </ul>

  )
}

export default Menu;
