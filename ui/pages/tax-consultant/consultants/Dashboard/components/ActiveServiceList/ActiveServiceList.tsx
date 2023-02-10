import Card from 'components/Card'
import LinkApp from 'components/LinkApp'
import Service from 'domain/Service/Service'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import style from './activeServiceList.module.scss'

interface ActiveServiceListProps {
  activeServices: Service[]
}

/**
 * Componente para renderizar el listado de servicios activos en el dashboard del asesor
 * @param activeServices Listado de servicios que actualmente están activos (con clientes)
 * @returns 
 */

const ActiveServiceList = ({ activeServices }: ActiveServiceListProps) => {
  return <ActiveServiceListView activeServices={activeServices} />
}

const ActiveServiceListView = ({ activeServices }: ActiveServiceListProps) => {
  return (
    <div className={`${style.activeServiceList}`}>
      <Card>
        <div className={style.cardContainer}>
          <p className='small-caps'>servicios activos</p>
          {activeServices.length !== 0 ? (
            <div>
              <ul>
                {activeServices.map((service , index: number) => {
                  return <li key={index} className={style.activeService}>
                    <Link href={`/tax-consultant/consultants/${service.userConsultantId}/services/${service.id}/`}>
                      <a className='flex-container align-center'>
                        <div className={style.textBlock}>
                          <p className={style.activeServiceTitle}>{service.title}</p>
                          <p className={style.clientsCount}>
                            <span>{service.user_count}</span>
                            <span>
                              <FormattedMessage id='btn.clients' />
                            </span>
                          </p>
                        </div>
                      </a>
                    </Link>
                  </li>
                })
                }
              </ul>
              <div className={style.seeAllLink}>
                <LinkApp
                  label={'btn.vew_all_services'}
                  linkStyle={'default'}
                  linkHref={`/tax-consultant/consultants/${activeServices[0].userConsultantId}/`}
                />
              </div>
            </div>
          ) : (
            <p>No tienes servicios activos</p>
          )}

        </div>
      </Card>
    </div>
  )
}

export default ActiveServiceList