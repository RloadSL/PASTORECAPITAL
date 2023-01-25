import ButtonApp from 'components/ButtonApp'
import style from './service.module.scss'
import Image from 'next/image'
import LinkApp from 'components/LinkApp'
import { useRouter } from 'next/router'
import serviceImage from '../../../../../../../../assets/img/serviceImage.jpg'
import { serviceDetail } from 'ui/utils/test.data'


const Service = () => {
  return <ServiceView />
}

const ServiceView = () => {
  const { asPath, route, push, query } = useRouter()

  const _handleNavigate = () => {
    const queryParams = `order_id=${query.service_id}&order_path=services`;
    push(
      route + `/payment?${queryParams}`,
      asPath + `payment?${queryParams}`
    )
  }
  return (
    <div className={style.serviceDetail}>
      <header>
        <p className='small-caps'>Servicio</p>
        <h1 className='main-title'>{serviceDetail.title}</h1>
      </header>
      {serviceDetail.image && (
        <div className={style.serviceImage}>
          <Image src={serviceDetail.image = serviceImage} alt='Imagen de detalle del servicio' />
        </div>
      )}
      <div className={style.serviceDetailContent}>
        {serviceDetail.description}
        {serviceDetail.list && (
          <div>
            <h2>¿Cómo funciona?</h2>
            <ul>
              {serviceDetail.list.map((listItem, index) => {
                return (
                  <li key={index}>
                    <span className={style.listNumber}>{index+1}.</span><span>{listItem}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

      </div>
      <footer>
        <div className={style.priceInfo}>
          <div className='flex-container align-center justify-end'>
            <p className={style.priceLabel}>Precio total:</p>
            <p className={style.priceQty}>{serviceDetail.price}€</p>
          </div>
          <small>IVA incluido</small>
        </div>
        <div className={style.priceButtonContainer}>
          <div className={style.priceButton}>
            <ButtonApp
              onClick={_handleNavigate}
              labelID='btn.hire'
              buttonStyle={'primary'}
            />
          </div>
        </div>
      </footer>      
    </div>
  )
}

export default Service
