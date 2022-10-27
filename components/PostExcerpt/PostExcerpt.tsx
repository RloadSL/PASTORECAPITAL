import Chips from 'components/Chips'
import style from './PostExcerpt.module.scss'
import parse from 'html-react-parser'
import React from 'react'
import { WpCat } from 'infrastructure/dto/course.dto'


export interface POSTEXCERPTPROPS {
  title?: string
  description: string
  thumbnail?: string
  chips?: any
  level?: WpCat | any,
  componentStyle?: 'card' | 'simple' | 'column' | 'row'
  hasSeparator?: boolean,
  footer?: {
    text?: string,
    date?: any //OJO al tipado debe ser Date
  }
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
  chips,
  level,
  componentStyle,
  hasSeparator,
  footer
}: POSTEXCERPTPROPS) => {
  return <PostExcerptView title={title} description={description} thumbnail={thumbnail} chips={chips} level={level} componentStyle={componentStyle} hasSeparator={hasSeparator} footer={footer} />
}

const PostExcerptView = ({
  title,
  description,
  thumbnail,
  chips,
  level,
  componentStyle = 'card',
  hasSeparator = true,
  footer
}: POSTEXCERPTPROPS) => {
  return (
    <div className={`${style.postExcerptContainer} ${style[componentStyle]}`}>
      <div style={thumbnail ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundSize: '80px' }} className={style.imageContainer}>
        {level && <span className={style.level}>{level.name}</span>}
      </div>
      <div className={style.textContent}>
        <p className={style.title}>{title}</p>
        <div className={style.description}>
          {parse(description)}
        </div>
        {hasSeparator ? <hr className={style.separator} /> : null}
        <div className={style.terms}>
          {chips ? (
            <Chips chips={chips.slice(0, 3)} color='lightMain' />
          ) : null}
          {footer ? (
            <p className={style.footer}>{footer.text}<span>{footer.date}</span></p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default React.memo(PostExcerpt)
