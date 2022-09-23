import Chips from 'components/Chips';
import Image from 'next/image'
import { useComponentUtils } from 'ui/hooks/components.hooks';
import style from './PostExcerpt.module.scss';
import parse from 'html-react-parser';
import React from 'react';


type THUMBNAIL = {
  imgUrl: string,
  altText: string
}

export interface POSTEXCERPTPROPS {

  title?: string,
  description: string,
  thumbnail?: string,
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

      {thumbnail ? <div className={style.imageContainer}><Image layout='fill' src={thumbnail} alt={title}/></div> : null}
      <p className={style.title}>{limitTextLength(60, title || '')}</p>
      <div className={style.description}>{parse(description)}</div>

      <div className={style.terms}>
        {terms ? <Chips chips={terms} color='lightMain' /> : null}
      </div>
    </div>
  )
}
export default  React.memo(PostExcerpt);