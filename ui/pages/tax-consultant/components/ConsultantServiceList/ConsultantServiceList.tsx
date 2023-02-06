import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import LinkApp from 'components/LinkApp'
import style from './ConsultantServiceList.module.scss'
import addIcon from '../../../../../assets/img/icons/add.svg'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import iconEdit from '../../../../../assets/img/icons/pencil.svg'
import iconDelete from '../../../../../assets/img/icons/trash.svg'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import serviceRepository from 'infrastructure/repositories/service.repository'
import Service from 'domain/Service/Service'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { toHoursAndMinutes } from 'ui/utils/component.utils'
import Link from 'next/link'

interface ConsultantServiceListProps {
  services?: Service[]
  maxServicesShown?: number
  isAdmin?: boolean
  consultantServiceListStyle?: 'fullList' | 'shortList' | any
  displayStyle?: 'blockContainer' | 'gridContainer'
}

/**
 * Componente para renderizar el listado de servicio en el dashboard del asesor
 * @param services Listado de servicios del asesor
 * @returns
 */

const ConsultantServiceList = ({
  consultantServiceListStyle = 'shortList',
  maxServicesShown = 20,
  displayStyle = 'gridContainer'
}: ConsultantServiceListProps) => {
  const [services, setServices] = useState<Service[]>([])
  const userLogged = useSelector(getUserLogged)

  const { query } = useRouter()
  useEffect(() => {
    let fetch = true
    if (query.id)
      serviceRepository.getServices(query.id as string).then(res => {
        if (fetch) {
          setServices(res)
        }
      })
    return () => {
      fetch = false
    }
  }, [query])

  const isAdmin = () => {
    return userLogged?.role.level >= 2 || userLogged?.uid === query.id
  }

  return (
    <ConsultantServiceListView
      isAdmin={isAdmin()}
      services={services}
      maxServicesShown={maxServicesShown}
      consultantServiceListStyle={consultantServiceListStyle}
      displayStyle={displayStyle}
    ></ConsultantServiceListView>
  )
}

const ConsultantServiceListView = ({
  isAdmin,
  services,
  consultantServiceListStyle = 'shortList',
  maxServicesShown = 20,
  displayStyle = 'gridContainer'
}: ConsultantServiceListProps) => {
  const { buildClassName, limitTextLength } = useComponentUtils()
  const { asPath } = useRouter()
  const setBackgroundColor = (itemIndex: number) => {
    const colors: Array<string> = [
      '#E8E288',
      '#ff8360',
      '#F15BB5',
      '#4CC9F0',
      '#7209B7'
    ]
    return colors[itemIndex % colors.length]
  }

  return (
    <div className={`${style.consultantServiceList} ${style[displayStyle]}`}>
      <div className={style.servicesBlock}>
        {services?.length !== 0 ? (
          <ul
            className={buildClassName(
              [consultantServiceListStyle, displayStyle],
              style
            )}
          >
            {services?.map((service, index: number) => {
              return (
                <li className={style.serviceItem} key={service.id}>
                  <Card>
                    <div className={`${style.service} flex-container`}>
                      <div>
                      <header className='flex-container'>
                        <div
                          className={style.colorSpot}
                          style={{ backgroundColor: setBackgroundColor(index) }}
                        ></div>
                        <Link href={asPath + `services/${service.id}`}>
                          <a className={style.serviceTitle}>{service.title}</a>
                        </Link>
                      </header>
                      <p className={style.serviceDescription}>
                        {limitTextLength(200, service.description)}
                      </p>
                      </div>

                      <div className={style.serviceInfoBlock}>
                        <div>
                          <hr />
                          <div className='flex-container justify-between'>
                            <p className={style.serviceDuration}>
                              <span>
                                Duración: <strong>{toHoursAndMinutes(service.time * 60)}</strong>
                              </span>
                            </p>
                            <p className={style.servicePrice}>
                              <span>
                                Precio:<strong>{service.price}</strong>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      {isAdmin === true &&
                        consultantServiceListStyle === 'fullList' ? (
                        <div
                          className={`${style.editBlock} edit-delete-buttons`}
                        >
                          <LinkApp
                            label={'btn.edit'}
                            linkStyle={'edit'}
                            linkHref={asPath + `services/${service.id}/edit`}
                            icon={iconEdit}
                          />
                          <ButtonApp
                            labelID={'btn.delete'}
                            onClick={() => console.log('borrar')}
                            type='button'
                            buttonStyle='delete'
                            size='small'
                            icon={iconDelete}
                          />
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </Card>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className={style.emptyContent}>
            <p>No has añadido ningún servicio</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsultantServiceList
