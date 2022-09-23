import LinkApp from "components/LinkApp"
import useCollapse from 'react-collapsed'
import Image from 'next/image'
import { FormattedMessage } from "react-intl";
import style from './MenuItem.module.scss'

interface MENUITEMPROPS {
  item:any,
  activeItem?: string
}

/**
 * Función principal del Item del menú
 * @param item Item que renderizará el menú, varía entre desplegable (accordion) o simple (linkItem)
 * @param activeItem Item activo del menú
 * @returns 
 */

const Menu = ({ item, activeItem }: MENUITEMPROPS) => {
  return <MenuItemView item={item} activeItem={activeItem}/>
}

/**
 * Función principal del render
 */

const MenuItemView = ({ item, activeItem }: MENUITEMPROPS) => {

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  const icon = () => <span className={style.iconAccordion}><Image src={item.icon} alt='' /></span>
  const collapsePanelLabel = <span className={style.labelAccordion}><FormattedMessage id={item.label} /></span>

  const renderAcordion = () => {
    return (
      <>
        <button {...getToggleProps()} className={`${style.menuItem} ${style.hasChildren}`}>
          {icon()}
          {collapsePanelLabel}
        </button>
        <div {...getCollapseProps()} className={style.menuChildren}>
          {item.children.map((itemLink: any, i: number) => renderLink(itemLink))}
        </div>
      </>
    )
  }

  const renderLink = (itemChildren?: any) => {
    const data = itemChildren ? itemChildren : item;
    return (<LinkApp key={data.label} label={data.label} linkHref={data.href} icon={data.icon} />)
  }

  return (
    <li className={`menu-item ${item.type}`}>
      <div className={activeItem === item.path ? style.active : ''}>
        {item.type === 'accordion' ? renderAcordion() : renderLink()}
      </div>
    </li>
  )
}

export default Menu;
