import style from './consultant-menu.module.scss'
import dashboardIcon from '../../../../../assets/img/icons/dashboard.svg'
import clientsIcon from '../../../../../assets/img/icons/clients.svg'
import servicesIcon from '../../../../../assets/img/icons/case.svg'
import questionIcon from '../../../../../assets/img/icons/question.svg'
import resourcesIcon from '../../../../../assets/img/icons/notebook.svg'
import LinkApp from 'components/LinkApp'
import useWindowSize from 'ui/hooks/windowSize.hook'
import UserImage from 'components/UserImage'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getCurrentConsultant } from 'ui/redux/slices/tax-consultants/tax-consultants.selectors'
import { useRouter } from 'next/router'
import { useConsultant } from 'ui/hooks/consultant.hook'
import { NOT_CONSULTANT } from 'domain/UserConsultant/UserConsultant'


interface ConsultantMenuProps {
  avatarImg?: any
}

const ConsultantMenu = ({ avatarImg }: ConsultantMenuProps) => {
  const windowSize = useWindowSize();
  const {consultant} = useConsultant()
  const renderLabel = (itemLabel: string) => {
    if (windowSize.width <= 520) {
      return ''
    }
    return itemLabel
  }
  if(!consultant  ||  consultant === NOT_CONSULTANT) return <div></div>;
  
  return (
    <div className={style.consultantMenuContainer}>
      <div className={style.avatarBlock}>
        <UserImage size={'small'} image={consultant?.avatar?.url} />
        <Link href={`/tax-consultant/consultants/${consultant?.id}/edit`}>
          <a className={style.editProfileButton}>ir</a>
        </Link>
      </div>
      <div className={style.menuBlock}>
        <ul>
        <li>
            <LinkApp key={null} linkStyle={'vertical'} label={renderLabel('profile')} linkHref={`/tax-consultant/consultants/${consultant?.id}/`} icon={servicesIcon} target={'_self'} />
          </li>
          <li>
            <LinkApp key={null} linkStyle={'vertical'} label={renderLabel('dashboard')} linkHref={`/tax-consultant/consultants/${consultant?.id}/dashboard`} icon={dashboardIcon} target={'_self'} />
          </li>
          <li>
            <LinkApp key={null} linkStyle={'vertical'} label={renderLabel('clients')} linkHref={`/tax-consultant/consultants/${consultant?.id}/clients`} icon={clientsIcon} target={'_self'} />
          </li>
          <li>
            <LinkApp key={null} linkStyle={'vertical'} label={renderLabel('questions')} linkHref={`/tax-consultant/consultants/${consultant?.id}/questions`} icon={questionIcon} target={'_self'} />
          </li>
         {/*  <li>
            <LinkApp key={null} linkStyle={'vertical'} label={renderLabel('resources')} linkHref={`/tax-consultant/consultants/${consultant?.id}/dashboard`} icon={resourcesIcon} target={'_self'} />
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default ConsultantMenu;