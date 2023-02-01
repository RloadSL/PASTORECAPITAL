import style from './userImage.module.scss'
import Image from 'next/image'
import { useComponentUtils } from 'ui/hooks/components.hooks'


type size = {
  width: any,
  height: any
}
interface UserImageProps {
  image: any
  userImageStyle?: Array<'rounded' | 'squared' | 'bordered' | 'nobordered'>
  size?: 'small' | 'medium' | 'large'
}

/**
 * Componente de imagen del usuario
 * @param image Imagen para renderizar
 * @param size tamaño de la imagen {ancho,alto}, por defecto es pequeña 'small' | 'medium' | 'large'
 * @param userImageStyle Estilo del contenedor de la imagen, redondo o cuadrado
 * @returns 
 */




const UserImage = ({ image, userImageStyle = ['rounded', 'bordered'], size = 'small' }: UserImageProps) => {
  const { buildClassName } = useComponentUtils()

  return (
    image ? (
      <div className={`${style.userImage} ${buildClassName(userImageStyle, style)} ${style[size]}`}>
        <div className={style.userImageContainer}>
          <Image layout='fill' src={image} alt={'Imagen de perfil del usuario'} />
        </div>
      </div>) : (
      <div className={`${style.noAvatarImage} ${style[size]}`}></div>
    )
  )
}

export default UserImage;