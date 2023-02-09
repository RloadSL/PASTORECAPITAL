import ButtonApp from 'components/ButtonApp'
import LinkApp from 'components/LinkApp'
import Image from 'next/image'
import clappingHands from '../../../../../../../../assets/img/clappingHands.png'
import style from './confirmed-payment.module.scss'

interface ConfirmedPaymentProps {
}

const ConfirmedPayment = ({ }: ConfirmedPaymentProps) => {
  return <ConfirmedPaymentView />
}

const ConfirmedPaymentView = () => {
  return (
    <div className={style.confirmedPayment}>
      <div className={style.successCard}>
    <div className={style.successCardContainer}>
      <p>Servicio contratado con éxito</p>
      <div className={style.imageContainer}>
        <Image src={clappingHands} alt={'manos aplaudiendo'}></Image>
      </div>
      <p className={style.successCardTitle}>
        ¡Muy bien, ya estamos casi listos!
      </p>
      <p>
      Pronto recibirás un mail de confirmación con todos los datos de tu compra y los pasos para recibir el servicio.
      </p>
      <div className={style.buttonContainer}>
        <LinkApp target={'_self'} label={'btn.accept'} linkStyle={'button'} linkHref='/' />
      </div>
    </div>
  </div>
    </div>
  )
}

export default ConfirmedPayment;