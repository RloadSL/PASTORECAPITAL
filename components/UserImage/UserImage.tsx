import style from './userImage.module.scss'
import Image from 'next/image'
import { size } from 'lodash'


interface UserImageProps {
  image: any
  userImageStyle?: 'rounded' | 'squared'
  // size?: {width:any,height:any} 
}

/**
 * Componente de imagen del usuario
 * @param image Imagen para renderizar
 * @param userImageStyle Estilo del contenedor de la imagen, redondo o cuadrado
 * @returns 
 */


const UserImage = ({ image, userImageStyle = 'rounded' }: UserImageProps) => {
  return <UserImageView image={image} userImageStyle={userImageStyle}  />
}

const UserImageView = ({ image, userImageStyle = 'rounded' }: UserImageProps) => {
  return (
    <div className={`${style.userImage} ${style[userImageStyle]}`}>
      <div className={style.userImageContainer}>
        <Image layout='fill' src={image} alt={'Imagen de perfil del usuario'} />
      </div>
    </div>
  )
}

export default UserImage;