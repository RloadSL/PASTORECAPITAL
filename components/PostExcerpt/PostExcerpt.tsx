import ChipList from 'components/ChipList/ChipList';
import Image from 'next/image'
import style from './PostExcerpt.module.scss';

type THUMBNAIL = {
  imgUrl:string,
  altText:string
}

export interface POSTEXCERPTPROPS {
  title?: string,
  description?: string,
  thumbnail?: THUMBNAIL,
  terms?: Array<any>
}

/**
 * Función principal del componente de extracto del post
 * @param gridItems Listado de elementos para renderizar en el grid
 * @returns 
 */

const PostExcerpt = ({ title, description, thumbnail, terms }: POSTEXCERPTPROPS) => {
  return (
    <div>
      {thumbnail ? <div className={style.imageContainer}><Image src={thumbnail.imgUrl} alt={thumbnail.altText}/></div> : null}
      <p className={style.title}>{title}</p>
      <p className={style.description}>{description}</p>
      <div className={style.terms}>
        {terms ? <ChipList chipList={terms}/> : null}
      </div>
    </div>
  )
}

export default PostExcerpt;