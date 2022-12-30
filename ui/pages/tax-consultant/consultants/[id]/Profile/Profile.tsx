import { FormattedMessage } from 'react-intl'
import ConsultantShortDetails from 'ui/pages/tax-consultant/components/ConsultantShortDetails'
import style from './profile.module.scss'
import { servicesList } from 'ui/utils/test.data'
import ConsultantServiceList from 'ui/pages/tax-consultant/components/ConsultantServiceList'


interface ProfileProps {
  country: any
  avatar: any
  name: string
  lastname: string
  keywords: Array<{ label: string, icon?: any }>
  state: 'new' | 'active' | 'disabled'
}

const Profile = ({
  country,
  name,
  lastname,
  avatar,
  keywords,
  state }: ProfileProps) => {
  const fakeKeywords = [{ label: 'Abogado' }, { label: 'Asesoría Fiscal' }];
  const services: any = servicesList;

  return (

    <div className={style.profile}>
      <header>
        <div className='small-caps'>
          <FormattedMessage id={'page.tax-consultant.profile.smallTitle'} />
        </div>
        <div className={style.profileShortDetails}>
          <ConsultantShortDetails country={country} name={'Paco'} lastname={'Pérez'} avatar={avatar} keywords={fakeKeywords} state={state} />
          <div className={style.rightContainer}>
            <div className={style.chatLink}></div>
            <span className={style.linkedinIcon}>linkedin</span>
          </div>
        </div>
        <div className={style.profileDescription}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi blanditiis, modi quis, quo laudantium cum nihil tempore nemo delectus quaerat, tempora corrupti vitae? Magni impedit maiores voluptatibus sapiente fuga inventore.
          </p>
        </div>
      </header>
      <div className={style.profileServices}>
        <p className='small-caps'>
          <FormattedMessage id={'page.tax-consultant.profile.services.smallTitle'} />
        </p>
        <ConsultantServiceList services={services} isOwner={false} consultantServiceListStyle={'fullList'} />
      </div>
      <div className={style.profileConversation}>
        <p className='main-title'>Ask to the expert</p>
      </div>
    </div>
  )
}

export default Profile;