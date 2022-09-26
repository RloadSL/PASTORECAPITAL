import Chips from 'components/Chips'
import Image from 'next/image'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import style from './PostExcerpt.module.scss'
import parse from 'html-react-parser'
import React from 'react'
import { WpCat } from 'infrastructure/dto/course.dto'

type THUMBNAIL = {
  imgUrl: string
  altText: string
}

export interface POSTEXCERPTPROPS {
  title?: string
  description: string
  thumbnail?: string
  terms?: Array<any>
  level?: WpCat
}

/**
 * Función principal del componente de extracto del post
 * @param gridItems Listado de elementos para renderizar en el grid
 * @returns
 */

const PostExcerpt = ({
  title,
  description,
  thumbnail,
  terms,
  level
}: POSTEXCERPTPROPS) => {
  const { limitTextLength } = useComponentUtils()
console.log(thumbnail)
  return (
    <div>
      <div style={{backgroundImage:`url(${thumbnail})`}} className={style.imageContainer}>
      {level && <span className={style.level}>{level.slug}</span>}
      
        {/* <Image layout='fill' src={thumbnail} alt={title}/></div> : null} */}
      </div>
      <p className={style.title}>{limitTextLength(60, title || '')}</p>
      <div className={style.description}>{parse(description)}</div>

      <div className={style.terms}>
        {terms ? (
          <Chips chips={terms.map(item => item.slug)} color='lightMain' />
        ) : null}
      </div>
    </div>
  )
}
export default React.memo(PostExcerpt)
