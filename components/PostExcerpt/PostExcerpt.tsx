import Chips from 'components/Chips';
import Image from 'next/image'
import { useComponentUtils } from 'ui/hooks/components.hooks';
import style from './PostExcerpt.module.scss';


type THUMBNAIL = {
  imgUrl: string,
  altText: string
}

export interface POSTEXCERPTPROPS {
  title: string,
  description?: string,
  thumbnail?: THUMBNAIL,
  terms?: Array<any>
  level?: Array<any>
}

/**
 * Función principal del componente de extracto del post
 * @param gridItems Listado de elementos para renderizar en el grid
 * @returns 
 */

const PostExcerpt = ({ title, description, thumbnail, terms, level }: POSTEXCERPTPROPS) => {

  const { limitTextLength } = useComponentUtils()

  return (
    <div>
      {thumbnail ? <div className={style.imageContainer}>
        {level ? <div className={style.level}><Chips chips={level} color='main' /></div> : null}
        <Image src={thumbnail.imgUrl} alt={thumbnail.altText} />
      </div> : null}
      <p className={style.title}>{limitTextLength(60, title)}</p>
      {description ? <p className={style.description}>{limitTextLength(120, description)}</p> : null}
      <div className={style.terms}>
        {terms ? <Chips chips={terms} color='lightMain' /> : null}
      </div>
    </div>
  )
}

export default PostExcerpt;