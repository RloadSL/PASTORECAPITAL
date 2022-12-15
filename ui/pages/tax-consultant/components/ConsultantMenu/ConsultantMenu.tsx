import style from './consultant-menu.module.scss'
import dashboardIcon from '../../../../../assets/img/icons/dashboard.svg'
import clientsIcon from '../../../../../assets/img/icons/clients.svg'
import servicesIcon from '../../../../../assets/img/icons/case.svg'
import questionIcon from '../../../../../assets/img/icons/question.svg'
import resourcesIcon from '../../../../../assets/img/icons/notebook.svg'
import Avatar from 'components/Avatar'
import LinkApp from 'components/LinkApp'
import useWindowSize from 'ui/hooks/windowSize.hook'
import Image from 'next/image'



interface ConsultantMenuProps {
}

const ConsultantMenu = ({ }: ConsultantMenuProps) => {
  return <ConsultantMenuView></ConsultantMenuView>
}

const ConsultantMenuView = ({ }: ConsultantMenuProps) => {
  const windowSize = useWindowSize();

  const renderLabel = (itemLabel: string) => {
    if (windowSize.width <= 520) {
      return ''
    }
    return itemLabel
  }

  return (
    <div className={style.consultantMenuContainer}>
      <div className={style.avatarBlock}>
      <Image src={''} alt=''/>
      </div>
      <div className={style.menuBlock}>
        <ul>
          <li>
            <LinkApp key={null} linkStyle={'vertical'} label={renderLabel('dashboard')} linkHref={'#'} icon={dashboardIcon} target={'_self'} />
          </li>
          <li>
            <LinkApp key={null} linkStyle={'vertical'} label={renderLabel('services')} linkHref={'#'} icon={servicesIcon} target={'_self'} />
          </li>
          <li>
            <LinkApp key={null} linkStyle={'vertical'} label={renderLabel('clients')} linkHref={'#'} icon={clientsIcon} target={'_self'} />
          </li>
          <li>
            <LinkApp key={null} linkStyle={'vertical'} label={renderLabel('questions')} linkHref={'#'} icon={questionIcon} target={'_self'} />
          </li>
          <li>
            <LinkApp key={null} linkStyle={'vertical'} label={renderLabel('resources')} linkHref={'#'} icon={resourcesIcon} target={'_self'} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ConsultantMenu;