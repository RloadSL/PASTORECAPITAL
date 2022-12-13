import AvatarName from 'components/AvatarName';
import Card from 'components/Card';
import ConsultantMenu from '../../components/ConsultantMenu';
import style from './consultantProfile.module.scss'
import { clientsList, servicesList } from 'ui/utils/test.data'
import ButtonApp from 'components/ButtonApp';
import calendarIcon from '../../../../../assets/img/icons/calendar.svg'
import clientsIcon from '../../../../../assets/img/icons/clients.svg'
import LinkApp from 'components/LinkApp';

interface ConsultantProps {
}

const ConsultantProfile = () => {
  const clients: any = clientsList;
  const services: any = servicesList;
  const maxServices = 3;
  const maxClients = 4
  const getActiveServices = services.filter((item: any) => item.clients !== undefined)

  return (
    <div className={style.consultantProfile}>
      <ConsultantMenu />
      <div className={style.profileDashboardGrid}>
        <div className={`${style.gridItem} ${style.newClients}`}>
          <div className={style.gridItemTitle}>
            <p>Nuevos Clientes</p>
            <span>VER TODOS</span>
          </div>
          <Card cardStyle={'modal'}>
            <div className={style.cardContainer}>
              {clients.length != 0 ? (
                <ul>
                  {clients.slice(0, maxClients).map((client: any, index: number) => {
                    return <li key={index}>
                      <div className={style.client}>
                        <div className={style.avatarBlock}>
                          <AvatarName userName={`${client.name} ${client.lastname}`} />
                        </div>
                        <div className={style.buttonBlock}>
                          <ButtonApp
                            labelID='Gestionar'
                            type='submit'
                            buttonStyle='dark'
                            size={'small'}
                          />
                        </div>

                      </div>
                    </li>
                  }
                  )}
                </ul>
              ) : (
                <p>No tienes clientes todavía</p>
              )}
            </div>

          </Card>

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
                <div>{clients.length}</div>
              </div>
            </div>
          </div>

          <div className={`${style.activeServices}`}>
            <Card>
              <div className={style.cardContainer}>
                <p className='small-caps'>servicios activos</p>
                {getActiveServices.length !== 0 ? (
                  <ul>
                    {getActiveServices.map((service: any, index: number) => {
                      return <li key={index} className={style.activeService}>
                        <div className={style.textBlock}>
                          <p className={style.activeServiceTitle}>{service.name}</p>
                          <p className={style.clientsCount}>{service.clients}</p>
                        </div>
                        <div className={style.buttonBlock}>
                          ir
                        </div>
                      </li>
                    })
                    }
                  </ul>
                ) : (
                  <p>No tienes servicios activos</p>
                )}

              </div>
            </Card>
          </div>
        </div>
        <div className={`${style.gridItem} ${style.allServices}`}>
          <div className={style.gridItemTitle}>
            <p>PORTFOLIO DE SERVICIOS</p>
            <div>
            <LinkApp
                  label={'VER TODOS'}
                  linkStyle={'default'}
                  linkHref={'#'}
                />
            </div>
          </div>
          <div className={style.gridItemContainer}>
            <div className={style.buttonBlock}>
              <div className={style.rotationContainer}>
                <ButtonApp
                  labelID='Añadir servicio'
                  type='submit'
                  buttonStyle='primary'
                  size={'default'}
                />
              </div>
            </div>
            <div className={style.servicesBlock}>
              {services.length !== 0 ? (
                <ul>
                  {services.slice(0, maxServices).map((service: any, index: number) => {
                    return (
                      <li className={style.serviceItem} key={index}>
                        <Card>
                          <div className={style.service}>
                            <p className={style.serviceTitle}>{service.name}</p>
                            <p className={style.serviceDescription}>{service.description}</p>
                            <hr />
                            <p className={style.servicePrice}>{service.price}</p>
                          </div>
                        </Card>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p>Aún no has añadido ningún servicio</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultantProfile;