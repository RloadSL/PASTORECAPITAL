import LinkApp from "components/LinkApp"
import Collapse, { Panel } from "rc-collapse"
require('rc-collapse/assets/index.css');
import motion from 'ui/utils/motion-utils'
import Image from 'next/image'
import { FormattedMessage } from "react-intl";
import style from './MenuItem.module.scss'

/**
 * Función principal del Item del menú
 * @param item Item que renderizará el menú, varía entre desplegable (accordion) o simple (linkItem)
 * @returns 
 */

export const MenuItem = ({ item }: any) => {

  const expandIcon = () => <span className={style.iconAccordion}><Image src={item.icon} alt='' /></span>
  const collapsePanelLabel = <span className={style.labelAccordion}><FormattedMessage id={item.label} /></span>

  const renderAcordion = () => {
    return (
      <Collapse openMotion={motion} expandIcon={expandIcon} className={style.menuItem}>
        <Panel header={collapsePanelLabel}>
          {item.children.map((itemLink: any, i: number) => renderLink(itemLink))}
        </Panel>
      </Collapse>)
  }

  const renderLink = (itemChildren?: any) => {
    const data = itemChildren ? itemChildren : item;
    return (<LinkApp key={data.label} label={data.label} linkHref={data.href} icon={data.icon} />)
  }

  return (
    <li className={`menu-item ${item.type}`}>
      <div>
        {item.type === 'accordion' ? renderAcordion() : renderLink()}
      </div>
    </li>
  )
}
