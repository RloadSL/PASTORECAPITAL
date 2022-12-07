import style from'./consultant-menu.module.scss'
import dashboardIcon from '../../../../../assets/img/icons/dashboard.svg'
import clientsIcon from '../../../../../assets/img/icons/clients.svg'
import caseIcon from '../../../../../assets/img/icons/case.svg'
import questionIcon from '../../../../../assets/img/icons/question.svg'
import resourcesIcon from '../../../../../assets/img/icons/notebook.svg'
import Avatar from 'components/Avatar'
import LinkApp from 'components/LinkApp'


interface ConsultantMenuProps {
}

const ConsultantMenu = ({ }: ConsultantMenuProps) => {
  return <ConsultantMenuView></ConsultantMenuView>
}

const ConsultantMenuView = ({ }: ConsultantMenuProps) => {
  return (
    <div className={style.consultantMenuContainer}>
      <div className={style.avatarBlock}>
        avatar
      </div>
      <div className={style.menuBlock}>
        <ul>
          <li>
          <LinkApp key={null} label={'dashboard'} linkHref={'#'} icon={dashboardIcon} target={'_self'} />
</li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default ConsultantMenu;