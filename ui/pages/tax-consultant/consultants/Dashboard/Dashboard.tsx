import ConsultantMenu from '../../components/ConsultantMenu';
import style from './dashboard.module.scss'
import { clientsList, servicesList } from 'ui/utils/test.data'
import calendarIcon from '../../../../../assets/img/icons/calendar.svg'
import clientsIcon from '../../../../../assets/img/icons/clients.svg'
import LinkApp from 'components/LinkApp';
import ClientList from '../../components/ClientList';
import ActiveServiceList from './components/ActiveServiceList';
import { NextPage } from 'next';
import ConsultantServiceList from '../../components/ConsultantServiceList';

interface DashboardProps {
}

/**
 * Página de dashboard del asesor
 * @param 
 * @returns 
 */

const Dashboard:NextPage = () => {
  return <DashboardView></DashboardView>
}

const DashboardView = ({}:DashboardProps) => {
  const clients: any = clientsList;
  const services: any = servicesList;

  //creo un array que me devuelve unicamente los servicios con clientes, que son os que están activos
  const getActiveServices = services.filter((item: any) => item.clients !== undefined)

  return (
    <div className={style.dashboard}>
      <ConsultantMenu />
      <div className={style.dashboardGrid}>
        <div className={`${style.gridItem} ${style.newClients}`}>
          <div className={style.gridItemTitle}>
            <p>Nuevos Clientes</p>
            <div>
              <LinkApp
                label={'VER TODOS'}
                linkStyle={'default'}
                linkHref={'http://localhost:3000/tax-consultant/consultants/123/services/'}
              />
            </div>
          </div>
          <ClientList clients={clients} />
        </div>
        <div className={`${style.gridItem} ${style.rightBlock}`}>
          <div className={style.rightInnerContainer}>
            <div className={`${style.calendly}`}>
              <LinkApp
                label={'Calendario'}
                linkStyle={'default'}
                linkHref={'#'}
                icon={calendarIcon}
              />
            </div>
            <div className={`${style.allClients}`}>
              <div className='flex-container align-center'>
                <LinkApp
                  label={'Clientes'}
                  linkStyle={'default'}
                  linkHref={'#'}
                  icon={clientsIcon}
                />
                <div>{`(${clients.length})`}</div>
              </div>
            </div>
          </div>
          <div className={`${style.activeServices}`}>
            <ActiveServiceList activeServices={getActiveServices}/>
          </div>
        </div>
        <div className={`${style.gridItem} ${style.allServices}`}>
          <div className={style.gridItemTitle}>
            <p>PORTFOLIO DE SERVICIOS</p>
            <div>
              <LinkApp
                label={'VER TODOS'}
                linkStyle={'default'}
                linkHref={'http://localhost:3000/tax-consultant/consultants/123/services/'}
              />
            </div>
          </div>
          <div>
            <ConsultantServiceList services={services} maxServicesShown={2} consultantServiceListStyle={'shortList'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;