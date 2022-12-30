import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import style from './ConsultantServiceList.module.scss'
import addIcon from '../../../../../assets/img/icons/add.svg'
import { forEach } from 'lodash'

interface ConsultantServiceListProps {
  services: Array<any>
  isOwner?: Boolean //Solo para mostrar u oucltar el botón e añadir servicio en desarrollo
  maxServicesShown?: number
  consultantServiceListStyle?: 'fullList' | 'shortList' | 'columnList'
}

/**
 * Componente para renderizar el listado de servicio en el dashboard del asesor
 * @param services Listado de servicios del asesor 
 * @returns 
 */

const ConsultantServiceList = ({ services, consultantServiceListStyle = 'shortList', maxServicesShown = 20, isOwner = true }: ConsultantServiceListProps) => {

  return <ConsultantServiceListView services={services} maxServicesShown={maxServicesShown} isOwner={isOwner} consultantServiceListStyle={consultantServiceListStyle}></ConsultantServiceListView>
}

const ConsultantServiceListView = ({ services, consultantServiceListStyle = 'shortList', maxServicesShown = 20, isOwner = true }: ConsultantServiceListProps) => {

  // const maxServices = 3; //máximo número de servicios que se renderizan en el portfolio del dashboard

  const renderServicesShown = () => {
    if (maxServicesShown < 20) {
      return services.slice(0, maxServicesShown);
    }
    return services;
  }

  const setBackgroundColor = (itemIndex: number) => {
    const colors: Array<string> = ['#E8E288', '#ff8360', '#F15BB5', '#4CC9F0', '#7209B7'];
    return colors[itemIndex % colors.length]
  }

  return (
    <div className={style.consultantServiceList}>
      {isOwner ? (
        <div className={style.buttonBlock}>
          <div className={style.rotationContainer}>
            <ButtonApp
              labelID='Añadir servicio'
              type='button'
              buttonStyle='primary'
              size={'default'}
              icon={addIcon}
            />
          </div>
        </div>
      ) : null}
      <div className={style.servicesBlock}>
        {services.length !== 0 ? (
          <ul className={style[consultantServiceListStyle]}>
            {renderServicesShown().map((service: any, index: number) => {
              return (
                <li className={style.serviceItem} key={index}>
                  <Card>
                    <div className={style.service}>
                      <div className='flex-container align-center'>
                        <div className={style.colorSpot} style={{ backgroundColor: setBackgroundColor(index) }}></div>
                        <p className={style.serviceTitle}>{service.name}</p>
                      </div>
                      <p className={style.serviceDescription}>{service.description}</p>
                      <hr />
                      <div className='flex-container justify-between'>
                        <p className={style.serviceDuration}>
                          <span>Duración: <strong>2h</strong></span>
                        </p>
                        <p className={style.servicePrice}>
                          <span>Precio:<strong>{service.price}</strong></span>
                        </p>
                      </div>
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