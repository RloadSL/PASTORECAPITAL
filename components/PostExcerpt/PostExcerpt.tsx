import Chips from 'components/Chips'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import style from './PostExcerpt.module.scss'
import parse from 'html-react-parser'
import React from 'react'
import { WpCat } from 'infrastructure/dto/course.dto'
import iconTag from '../../assets/img/icons/tags.svg'

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
  console.log('esto', thumbnail)
  return <PostExcerptView title={title} description={description} thumbnail={thumbnail} terms={terms} level={level} />
}

const PostExcerptView = ({
  title,
  description,
  thumbnail,
  terms,
  level
}: POSTEXCERPTPROPS) => {
  const { limitTextLength } = useComponentUtils()
  return (
    <div className={style.postExcerptContainer}>
      <div style={thumbnail ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundSize: '80px' }} className={style.imageContainer}>
        {level && <span className={style.level}>{level.slug}</span>}
      </div>
      <div className={style.textContent}>
        <p className={style.title}>{limitTextLength(60, title || '')}</p>
        <div className={style.description}>
          {parse(limitTextLength(130, description || ''))}
        </div>
        <hr className={style.separator} />
        <div className={style.terms}>
          {terms ? (
            <Chips hasIcon={iconTag} chips={terms.slice(0, 3).map(item => item.slug)} color='lightMain' />
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default React.memo(PostExcerpt)
