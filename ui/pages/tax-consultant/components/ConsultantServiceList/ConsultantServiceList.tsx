import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import LinkApp from 'components/LinkApp'
import style from './ConsultantServiceList.module.scss'
import addIcon from '../../../../../assets/img/icons/add.svg'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import iconEdit from '../../../../../assets/img/icons/pencil.svg'
import iconDelete from '../../../../../assets/img/icons/trash.svg'


interface ConsultantServiceListProps {
  services: Array<any>
  isOwner?: Boolean //Solo para mostrar u oucltar el botón e añadir servicio en desarrollo OJO
  maxServicesShown?: number
  consultantServiceListStyle?: 'fullList' | 'shortList' | any
  displayStyle?: 'blockContainer' | 'gridContainer'
}

/**
 * Componente para renderizar el listado de servicio en el dashboard del asesor
 * @param services Listado de servicios del asesor 
 * @returns 
 */

const ConsultantServiceList = ({ services, consultantServiceListStyle = 'shortList', maxServicesShown = 20, isOwner = true, displayStyle = 'gridContainer' }: ConsultantServiceListProps) => {

  return <ConsultantServiceListView services={services} maxServicesShown={maxServicesShown} isOwner={isOwner} consultantServiceListStyle={consultantServiceListStyle} displayStyle={displayStyle}></ConsultantServiceListView>
}

const ConsultantServiceListView = ({ services, consultantServiceListStyle = 'shortList', maxServicesShown = 20, isOwner = true, displayStyle='gridContainer' }: ConsultantServiceListProps) => {

  // const maxServices = 3; //máximo número de servicios que se renderizan en el portfolio del dashboard

  const { buildClassName } = useComponentUtils()


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
    <div className={`${style.consultantServiceList} ${style[displayStyle]}`}>
      {isOwner ? (
        <div className={style.buttonBlock}>
          <div className={displayStyle === 'gridContainer' && consultantServiceListStyle === 'shortList' ? style.rotationContainer : style.simpleContainer}>
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
          <ul className={buildClassName([consultantServiceListStyle,displayStyle], style)}>
            {renderServicesShown().map((service: any, index: number) => {
              return (
                <li className={style.serviceItem} key={index}>
                  <Card>
                    <div className={`${style.service} flex-container`}>
                      <div className={style.colorSpot} style={{ backgroundColor: setBackgroundColor(index) }}>
                      </div>
                      <div className={style.serviceInfoBlock}>
                        <p className={style.serviceTitle}>{service.name}</p>
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
                      {isOwner === true && consultantServiceListStyle === 'fullList' ? (
                        <div className={`${style.editBlock} edit-delete-buttons`}>
                          <LinkApp
                            label={'btn.edit'}
                            linkStyle={'edit'}
                            linkHref={'#'}
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
                      ) : ''}
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