import Chips from 'components/Chips'
import style from './PostExcerpt.module.scss'
import parse from 'html-react-parser'
import React from 'react'
import { WpCat } from 'infrastructure/dto/course.dto'
import Avatar from 'components/Avatar'

export interface POSTEXCERPTPROPS {
  title?: string
  description: string
  thumbnail?: string
  chips?: any
  level?: WpCat | any
  componentStyle?: 'card' | 'simple' | 'column' | 'row' | any
  hasSeparator?: boolean
  footer?: {
    // avatar?: any,
    text?: string
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
  return (
    <PostExcerptView
      title={title}
      description={description}
      thumbnail={thumbnail}
      chips={chips}
      level={level}
      componentStyle={componentStyle}
      hasSeparator={hasSeparator}
      footer={footer}
    />
  )
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
      <div
        style={
          thumbnail
            ? {
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            : { backgroundSize: '80px' }
        }
        className={style.imageContainer}
      >
        {level && <span className={style.level}>{level.name}</span>}
      </div>
      <div className={style.textContent}>
        <p className={style.title}>{title}</p>
        <div className={style.description}>{parse(description)}</div>
        {hasSeparator ? <hr className={style.separator} /> : null}
        <div className={style.terms}>
          {chips ? <Chips chips={chips.slice(0, 3)} color='lightMain' /> : null}
          {footer ? (
            <div className={style.footer}>
              {footer.text != 'undefined' && (
                <div className={style.avatar}>
                  <Avatar renderItem={footer.text ? footer.text[0] : null} />
                </div>
              )}
              <p className={style.content}>
                {footer.text != 'undefined' && <span className={style.author}>{footer.text}</span>}
                <span className={style.date}>{footer.date}</span>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default React.memo(PostExcerpt)
