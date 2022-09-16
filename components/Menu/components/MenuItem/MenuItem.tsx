import LinkApp from "components/LinkApp"
import Collapse, { Panel } from "rc-collapse"
require('rc-collapse/assets/index.css');
import motion from 'ui/utils/motion-utils'
import Image from 'next/image'
import { FormattedMessage } from "react-intl";


export const MenuItem = ({ item }: any) => {

  const expandIcon = () => <Image src={item.icon} alt=''/>
  const collapsePanelLabel = <FormattedMessage id={item.label} />

  const renderAcordion = () => {
    return (<Collapse openMotion={motion} expandIcon={expandIcon}
      >
       <Panel header={collapsePanelLabel}>
          {item.children.map((itemLink:any, i:number) => renderLink(itemLink))} 
        </Panel>
    </Collapse>)
  }

  const renderLink = (itemChildren?:any) => {
    const data = itemChildren ? itemChildren : item;
    return (<LinkApp key={data.label} label={data.label} linkHref={data.href} icon={data.icon}/>)
  }

  return (
    <li className={`menu-item ${item.type}`}>
      <div>
        {item.type === 'accordion' ? renderAcordion() : renderLink()}
      </div>
    </li>
  )
}
