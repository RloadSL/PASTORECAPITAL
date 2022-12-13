import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import style from './portfolioServiceList.module.scss'
import addIcon from '../../../../../../../assets/img/icons/add.svg'

interface PortfolioServiceListProps {
  services: Array<any>
}

/**
 * Componente para renderizar el listado de servicio en el dashboard del asesor
 * @param services Listado de servicios del asesor 
 * @returns 
 */

const PortfolioServiceList = ({ services }: PortfolioServiceListProps) => {
  return <PortfolioServiceListView services={services}></PortfolioServiceListView>
}

const PortfolioServiceListView = ({ services }: PortfolioServiceListProps) => {
  const maxServices = 3; //máximo número de servicios que se renderizan en el portfolio del dashboard

  return (
    <div className={style.portfolioServiceList}>
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
          <div className={style.emptyContent}>
            <p>No has añadido ningún servicio</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioServiceList