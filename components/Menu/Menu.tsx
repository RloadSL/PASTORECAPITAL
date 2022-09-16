import {mainMenuItems} from "ui/utils/mainMenu.config"
import MenuItem from "./components/MenuItem"

interface MENUPROPS {
  itemList?: Array<any>
}

/**
 * Función principal del componente Menú
 * @param itemList Listado de items del menú 
 * @returns 
 */

export const Menu = ({ itemList }: MENUPROPS) => {
  return (
    <ul>
      {mainMenuItems.map((item, index) =>
        <MenuItem key={index} item={item}/>
      )}
    </ul>
  )
}
