import Avatar from 'components/Avatar/Avatar'
import style from './avatarName.module.scss'

/**
 * Componente que renderiza la imagen de avatar y el nombre de usuario
 * @param userName Nombre del usuario para renderizar 
 * @returns 
 */

const AvatarName = ({ userName, subtitle } : { userName: string , subtitle?: string}) => {
  return <div className={style.avatarNameContainer}>
    <Avatar size={'large'} renderItem={userName[0]} />
    <div>
    <span>{userName}</span>
    {subtitle && <span className={style.subtitle}>{subtitle}</span>}
    </div>
   
  </div>
}

export default AvatarName;