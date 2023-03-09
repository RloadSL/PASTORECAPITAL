import ButtonApp from 'components/ButtonApp'
import LinkApp from 'components/LinkApp'
import Image from 'next/image'
import { FormattedMessage } from 'react-intl'
import clappingHands from '../../assets/img/clappingHands.png'
import style from './thank.module.scss'



const Thankyou = () => {
  return (
    <div className={style.thankyou}>
      <div className={style.successCard}>
        <div className={style.successCardContainer}>
          <p>
            <FormattedMessage id={'page.subscription.payment.modalSuccess.title'}/>
          </p>
          <div className={style.imageContainer}>
            <Image src={clappingHands} alt={'manos aplaudiendo'}></Image>
          </div>
          <p className={style.successCardTitle}>
            <FormattedMessage id={'page.subscription.payment.modalSuccess.subtitle'}/>
          </p>
          <p>
            <FormattedMessage id={'page.subscription.payment.modalSuccess.text'}/>
          </p>
          <div className={style.buttonContainer}>
            <div className={style.buttonContainer}>
              <LinkApp target={'_self'} label={'page.subscription.payment.modalSuccess.button'} linkStyle={'button'} linkHref='/' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thankyou;