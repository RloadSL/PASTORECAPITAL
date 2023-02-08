import ButtonApp from 'components/ButtonApp'
import Image from 'next/image'
import clappingHands from '../../assets/img/clappingHands.png'
import style from './thank.module.scss'



const Thankyou = () => {
  return (
    <div className={style.Thankyou}>
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
        Pronto recibiras un mail de confirmación con todos los datos de tu
        compra.
      </p>
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

export default Thankyou;