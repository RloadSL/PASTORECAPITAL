import ConsultantMenu from '../../components/ConsultantMenu'
import style from './services.module.scss'
import { clientsList, servicesList } from 'ui/utils/test.data'
import Card from 'components/Card'
import ButtonApp from 'components/ButtonApp'
import addIcon from '../../../../../assets/img/icons/add.svg'
import ConsultantServiceList from '../../components/ConsultantServiceList'


interface ServicesProps {
}

/**
 * Página del listado de servicios de un asesor
 * @param 
 * @returns 
 */

const Services = ({ }: ServicesProps) => {
  return <ServicesView></ServicesView>
}

const ServicesView = ({ }: ServicesProps) => {
  return (
    <div className={style.services}>
      <header>
        <ConsultantMenu />
      </header>
      <div>
        <h1 className='small-caps'>Servicios</h1>
        <div className={style.buttonBlock}>
          <ButtonApp
            labelID='Añadir servicio'
            type='submit'
            buttonStyle='primary'
            size={'default'}
            icon={addIcon}
          />
        </div>
        <ConsultantServiceList services={servicesList} isOwner={false} consultantServiceListStyle={'fullList'} />

        {/* <ul>
          {servicesList.map((service: any, index: number) => {
            return (
              <li key={index}>
                <Card>
                  <div className={style.cardContainer}>
                    <p>{service.name}</p>
                  </div>
                </Card>
              </li>
            )
          })}
        </ul> */}

      </div>
    </div>
  )
}

export default Services;