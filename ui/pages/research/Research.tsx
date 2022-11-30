import style from './research.module.scss'
import Image from 'next/image'
import headerImg from '../../../assets/img/landing-academy.png'
import bitaltcoinsImg from '../../../assets/img/bitaltcoins.png'
import flashupdatesImg from '../../../assets/img/flashupdates.png'
import ButtonApp from 'components/ButtonApp'
import { FormattedMessage } from 'react-intl'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import LinkApp from 'components/LinkApp'


const Research = () => {
  const { userLogged } = useAuthentication()
  return (
    <div className={style.academyPage}>
      <header>
        <p className='small-caps'>Research</p>
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
              <Image src={bitaltcoinsImg} alt='' />
            </div>
            <div className={style.textContainer}>
              <div className={style.titleBlock}>
                <p className={style.title}>Bitcoins / Altcoins</p>
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
              <Image src={flashupdatesImg} alt='' />
            </div>
            <div className={style.textContainer}>
              <div className={style.titleBlock}>
                <p className={style.title}>Flash Updates</p>
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

export default Research