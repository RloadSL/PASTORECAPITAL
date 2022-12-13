import Card from 'components/Card'
import LinkApp from 'components/LinkApp'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import style from './activeServiceList.module.scss'

interface ActiveServiceListProps {
  activeServices: any
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
                {activeServices.slice(0, 3).map((service: any, index: number) => {
                  return <li key={index} className={style.activeService}>
                    <Link href={'http://localhost:3000/tax-consultant/consultants/123/services/123/'}>
                      <a className='flex-container align-center'>
                        <div className={style.textBlock}>
                          <p className={style.activeServiceTitle}>{service.name}</p>
                          <p className={style.clientsCount}>
                            <span>{service.clients}</span>
                            <span>
                              <FormattedMessage id='clientes' />
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
                  label={'Ver todos los servicios'}
                  linkStyle={'default'}
                  linkHref={'#'}
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