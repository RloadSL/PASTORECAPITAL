import style from './tax-consultant.module.scss'
import Image from 'next/image'
import consultantImg from '../../../assets/img/consultant.png'
import resourcesImg from '../../../assets/img/resources.png'
// import ButtonApp from 'components/ButtonApp'
import { FormattedMessage } from 'react-intl'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import LinkApp from 'components/LinkApp'
import ConsultantMenu from './components/ConsultantMenu'


const TaxConsultant = () => {
  const { userLogged } = useAuthentication()
  return (
    <div className={style.taxConsultantPage}>
            <ConsultantMenu></ConsultantMenu>

      <header>
        <p className='small-caps'>Asesor Fiscal</p>
        <p className={`${style.topTitle} main-title`}><FormattedMessage id='page.academy.mainTitle' /><span> {userLogged?.name}</span></p>
      </header>
      <div className={style.bottomContainer}>
        <div className={style.leftContainer}>
          <div className={`flex-container align-center ${style.flexContainer}`}>
            <div className={style.imageContainer}>
              <Image src={consultantImg} alt='' />
            </div>
            <div className={style.textContainer}>
              <div className={style.titleBlock}>
                <p className={style.title}>Asesor Fiscal</p>
              </div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, aspernatur? Sunt praesentium autem vitae architecto</p>
              <div className={style.buttonContainer}>
                <LinkApp target={'_self'} label={'page.research.landing.button.label'} linkStyle={'button'} linkHref='research/bitcoins-altcoins' />
              </div>
            </div>
          </div>
        </div>
        <div className={style.rightContainer}>
          <div className={`flex-container align-center ${style.flexContainer}`}>
            <div className={style.imageContainer}>
              <Image src={resourcesImg} alt='' />
            </div>
            <div className={style.textContainer}>
              <div className={style.titleBlock}>
                <p className={style.title}>Recursos</p>
              </div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, aspernatur? Sunt praesentium autem vitae architecto</p>
              <div className={style.buttonContainer}>
                <LinkApp target={'_self'} label={'page.research.landing.button.label'} linkStyle={'button'} linkHref='research/flash-updates' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaxConsultant