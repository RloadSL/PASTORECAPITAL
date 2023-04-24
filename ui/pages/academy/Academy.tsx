import style from './Academy.module.scss'
import Image from 'next/image'
import headerImg from '../../../assets/img/landing-academy.png'
import ourCoursesImg from '../../../assets/img/our-courses.png'
import ourTutorialsImg from '../../../assets/img/our-tutorials.png'
import ButtonApp from 'components/ButtonApp'
import { FormattedMessage } from 'react-intl'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import LinkApp from 'components/LinkApp'


const Academy = () => {
  const { userLogged } = useAuthentication()
  return (
    <div className={style.academyPage}>
      <header>
        <p className='small-caps'><FormattedMessage id='academy' /></p>
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
              <Image src={ourCoursesImg} alt='' />
            </div>
            <div className={style.textContainer}>
              <div className={style.titleBlock}>
                <p><FormattedMessage id='our' /></p>
                <p className={style.title}><FormattedMessage id='courses' /></p>
              </div>
              <p><FormattedMessage id={'page.academy.landing.cursos'}></FormattedMessage></p>
              <div className={style.buttonContainer}>
                <LinkApp target={'_self'} label={'page.academy.leftBlock.button.label'} linkStyle={'button'} linkHref='academy/courses' />
              </div>
            </div>
          </div>
        </div>
        <div className={style.rightContainer}>
          <div className={`flex-container align-center ${style.flexContainer}`}>
            <div className={style.imageContainer}>
              <Image src={ourTutorialsImg} alt='' />
            </div>
            <div className={style.textContainer}>
              <div className={style.titleBlock}>
                <p><FormattedMessage id='our' /></p>
                <p className={style.title}><FormattedMessage id='tutorials' /></p>
              </div>
              <p><FormattedMessage id={'page.academy.landing.tutorials'}></FormattedMessage></p>
              <div className={style.buttonContainer}>
                <LinkApp target={'_self'} label={'page.academy.rightBlock.button.label'} linkStyle={'button'} linkHref='academy/tutorials' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Academy