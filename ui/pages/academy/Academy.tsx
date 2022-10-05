import style from './Academy.module.scss'
import Image from 'next/image'
import headerImg from '../../../assets/img/landing-academy.png'
import ourCoursesImg from '../../../assets/img/our-courses.png'
import ourTutorialsImg from '../../../assets/img/our-tutorials.png'
import ButtonApp from 'components/ButtonApp'


const Academy = () => {
  return (
    <div className={style.academyPage}>
      <header>
        <p className='small-caps'>Academia</p>
        <p className={`${style.topTitle} main-title`}>Hola,<span> Luis</span></p>
      </header>
      <div className={style.topContainer}>
        <div className={style.innerContainer}>
          <p>Desarrolla tus habilidades con Pastore Capital</p>
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
                <p>Nuestros</p>
                <p className={style.title}>Cursos</p>
              </div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, aspernatur? Sunt praesentium autem vitae architecto</p>
              <div className={style.buttonContainer}>
                <ButtonApp
                  buttonStyle='dark'
                  type='button'
                  labelID='page.academy.courses.form.create.submit'
                />
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
                <p>Nuestros</p>
                <p className={style.title}>Tutoriales</p>
              </div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, aspernatur? Sunt praesentium autem vitae architecto</p>
              <div className={style.buttonContainer}>
                <ButtonApp
                  buttonStyle='dark'
                  type='button'
                  labelID='page.academy.courses.form.create.submit'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Academy