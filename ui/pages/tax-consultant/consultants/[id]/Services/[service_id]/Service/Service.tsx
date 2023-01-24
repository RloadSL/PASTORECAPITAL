import ButtonApp from 'components/ButtonApp'
import style from './service.module.scss'
import Image from 'next/image'
import clappingHands from '../../../../../../../../assets/img/clappingHands.png'
import serviceImage from '../../../../../../../../assets/img/serviceImage.jpg'
import { serviceDetail } from 'ui/utils/test.data'


const Service = () => {
  return (<ServiceView />)
}

const ServiceView = () => {
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
              buttonStyle='primary'
              type='submit'
              labelID='btn.hire'
            />
          </div>

        </div>
      </footer>
      {/* Esto va en otro componente??? cuando se produzca con éxito la compra de un servicio*/}
      <div className={style.successCard}>
        <div className={style.successCardContainer}>
          <p>Servicio contratado con éxito</p>
          <div className={style.imageContainer}>
            <Image src={clappingHands} alt={'manos aplaudiendo'}></Image>
          </div>
          <p className={style.successCardTitle}>¡Muy bien, ya estamos casi listos!</p>
          <p>Pronto recibiras un mail de confirmación con todos los datos de tu compra.</p>
          <div className={style.buttonContainer}>
            <ButtonApp
              buttonStyle='secondary'
              type='submit'
              labelID='btn.accept'
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Service;