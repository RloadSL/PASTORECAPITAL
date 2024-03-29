import ConsultantMenu from '../../components/ConsultantMenu';
import style from './dashboard.module.scss'
import calendarIcon from '../../../../../assets/img/icons/calendar.svg'
import clientsIcon from '../../../../../assets/img/icons/clients.svg'
import LinkApp from 'components/LinkApp';
import ClientList from '../../components/ClientList';
import ActiveServiceList from './components/ActiveServiceList';
import ConsultantServiceList from '../../components/ConsultantServiceList';
import { useSelector } from 'react-redux';
import { getCurrentConsultant } from 'ui/redux/slices/tax-consultants/tax-consultants.selectors';
import { useEffect, useRef, useState } from 'react';
import { UserConsultant } from 'domain/UserConsultant/UserConsultant';
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';



/**
 * Página de dashboard del asesor
 * @param 
 * @returns 
 */

const Dashboard = () => {
  const userLogged = useSelector(getUserLogged)
  const consultant = useSelector(getCurrentConsultant)
  const [clients, setClients] = useState<any>([])
  const [activeService, setActiveService] = useState<any>([])
  const {replace} = useRouter()
  useEffect(() => {
   if(consultant instanceof UserConsultant){
       consultant.getClients()
       .then(res => setClients(res))

       consultant.getActiveServices()
       .then(res => setActiveService(res))
   }
  }, [consultant])
  
  useEffect(() => {
    if(userLogged && !userLogged.checkColaborationPermisionByModule('consultant')){
      replace('/tax-consultant/consultants')
    }
  }, [userLogged])
  

  return (
    <div className={style.dashboard}>
      <ConsultantMenu />
      <div className={style.dashboardGrid}>
        <div className={`${style.gridItem} ${style.newClients}`}>
          <div className={style.gridItemTitle}>
            <p><FormattedMessage id='new_clients'/></p>
            <div>
              <LinkApp
                label={'btn.vew_all'}
                linkStyle={'default'}
                target={'_self'}
                linkHref={`/tax-consultant/consultants/${consultant instanceof UserConsultant ? consultant?.id : '-'}/clients/`}
              />
            </div>
          </div>
          <ClientList clients={clients} />
        </div>
        <div className={`${style.gridItem} ${style.rightBlock}`}>
          <div className={style.rightInnerContainer}>
            <div className={`${style.calendly}`}>
              <LinkApp
                label={'btn.calendar'}
                linkStyle={'default'}
                linkHref={consultant instanceof UserConsultant ? consultant?.calendly : ''}
                icon={calendarIcon}
              />
            </div>
            <div className={`${style.allClients}`}>
              <div className='flex-container align-center'>
                <LinkApp
                  label={'btn.clients'}
                  linkStyle={'default'}
                  linkHref={'#'}
                  icon={clientsIcon}
                />
                <div>{`(${consultant instanceof UserConsultant ? consultant?.user_count || 0 : 0})`}</div>
              </div>
            </div>
          </div>
          <div className={`${style.activeServices}`}>
            <ActiveServiceList activeServices={activeService}/>
          </div>
        </div>
        <div className={`${style.gridItem} ${style.allServices}`}>
          <div className={style.gridItemTitle}>
            <p><FormattedMessage id='services_porfolio'/></p>
            <div>
              <LinkApp
                label={'btn.vew_all'}
                linkStyle={'default'}
                linkHref={`/tax-consultant/consultants/${consultant instanceof UserConsultant ? consultant?.id : ''}`}
              />
            </div>
          </div>
          <div>
            <ConsultantServiceList maxServicesShown={2} consultantServiceListStyle={'shortList'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;