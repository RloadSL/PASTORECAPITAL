import style from './tax-consultant.module.scss'
import Image from 'next/image'
import consultantImg from '../../../assets/img/consultant.png'
import resourcesImg from '../../../assets/img/resources.png'
import headerImg from '../../../assets/img/landing-academy.png'
import { FormattedMessage } from 'react-intl'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import LinkApp from 'components/LinkApp'


const TaxConsultant = () => {
  const { userLogged } = useAuthentication()
  return (
    <div className={style.taxConsultantPage}>
      <header>
        <p className='small-caps'><FormattedMessage id='mainMenu.item.label.taxConsultant' /></p>
        <p className={`${style.topTitle} main-title`}><FormattedMessage id='page.academy.mainTitle' /><span> {userLogged?.name}</span></p>
      </header>
      <div className={style.topContainer}>
        <div className={style.innerContainer}>
          <p><FormattedMessage id='page.academy.mainBlock.title' /></p>
          <div className={style.headerImageContainer}>
            <div className={style.headerImage}>
              <Image src={headerImg} alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className={style.bottomContainer}>
        <div className={style.leftContainer}>
          <div className={`flex-container align-center ${style.flexContainer}`}>
            <div className={style.imageContainer}>
              <Image src={consultantImg} alt='' />
            </div>
            <div className={style.textContainer}>
              <div className={style.titleBlock}>
                <p className={style.title}><FormattedMessage id='mainMenu.item.label.taxConsultant' /></p>
              </div>
              <p><FormattedMessage id='page.tax-consultant.landing.block-1' /></p>
              <div className={style.buttonContainer}>
                <LinkApp target={'_self'} label={'page.research.landing.button.label'} linkStyle={'button'} linkHref='tax-consultant/consultants' />
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
                <p className={style.title}><FormattedMessage id='mainMenu.item.label.resources' /></p>
              </div>
              <p><FormattedMessage id='page.tax-consultant.landing.block-1' /></p>
              <div className={style.buttonContainer}>
                <LinkApp target={'_self'} label={'page.research.landing.button.label'} linkStyle={'button'} linkHref='tax-consultant/resources' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaxConsultant