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
  // console.log('este es el',level)
  return (
    <div className={`${style.postExcerptContainer} ${style[componentStyle]}`}>
      <div style={thumbnail ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundSize: '80px' }} className={style.imageContainer}>
        {/* {level && <div className={style.level}><span className={style.levelLabel}>{level.label}</span> {level.icon !== undefined && <span className={style.levelIcon}>{level.icon}</span>}</div>} */}
        {level.label && <div className={style.level}>
          <Chips chips={[{ label: level.label, icon: level.icon?.src }]} color='main' />
        </div>}
      </div>
      <div className={style.textContent}>
        <p className={style.title}>{title}</p>
        <div className={style.description}>{parse(description)}</div>
        <div className={style.terms}>
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
          {hasSeparator ? <hr className={style.separator} /> : null}
          {chips ? <Chips chips={chips.slice(0, 3)} color='lightMain' /> : null}
        </div>
      </div>
    </div>
  )
}
export default React.memo(PostExcerpt)
