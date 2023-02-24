import Avatar from 'components/Avatar/Avatar'
import style from './avatarName.module.scss'

/**
 * Componente que renderiza la imagen de avatar y el nombre de usuario
 * @param userName Nombre del usuario para renderizar 
 * @param uid Id del usuario
 * @returns 
 */

const AvatarName = ({ userName, subtitle, uid } : { userName: string , subtitle?: string, uid?: any}) => {
  return <div className={style.avatarNameContainer}>
    <Avatar uid={uid} size={'large'} renderItem={userName[0]} />
    <div>
    <span>{userName}</span>
    {subtitle && <span className={style.subtitle}>{subtitle}</span>}
    </div>
  </div>
}

export default AvatarName;