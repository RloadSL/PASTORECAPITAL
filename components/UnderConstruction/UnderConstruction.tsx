import style from './UnderConstruction.module.scss'
import constructionIcon from '../../assets/img/tools.png'
import alertIcon from '../../assets/img/alert.png'
import Image from 'next/image'
import Card from 'components/Card'

type MESSAGECONTENT = '404' | 'underconstruction'

interface UNDERCONSTRUCTIONPROPS {
  messageType: MESSAGECONTENT
}

const UnderConstruction = ({ messageType= 'underconstruction' }: UNDERCONSTRUCTIONPROPS) => {
  const renderMessage = () => {
    if (messageType === 'underconstruction') {
      return (
        {
          title: 'En construcción',
          text: 'Aún estamos trabajando en esta sección',
          iconUrl: constructionIcon
        }
      )
    } else {
      return (
        {
          title: '404',
          text: 'Ups, no hemos encontrado lo que buscas',
          iconUrl: alertIcon
        }
      )
    }
  }
  const message = renderMessage();
  return (
    <div className={style.underConstruction}>
      <Card>
        <div className={style.innerContainer}>
          <div className={style.imageContainer}>
            <div className={style.iconWrapper}>
              <Image className={style.icon} src={message.iconUrl} alt='' />
            </div>
          </div>
          <p className={style.title}>{message.title}</p>
          <p>{message.text}</p>
        </div>
      </Card>
    </div>
  )
}

export default UnderConstruction;