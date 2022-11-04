import Chips from 'components/Chips'
import style from './CollapsedPost.module.scss'
import parse from 'html-react-parser'
import React from 'react'
import { WpCat } from 'infrastructure/dto/course.dto'
import Avatar from 'components/Avatar'
import LockedContent from 'components/LockedContent'

export interface COLLAPSEDPOSTPROPS {
  title?: string
  description: string
  thumbnail?: string
  chips?: any
  level?: WpCat | any
  componentStyle?: 'card' | 'simple' | 'column' | 'row' | any
  hasSeparator?: boolean
  header?: {
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



const CollapsedPost = ({
  title,
  description,
  thumbnail,
  chips,
  level,
  componentStyle,
  hasSeparator,
  header
}: COLLAPSEDPOSTPROPS) => {
  return (
    <CollapsedPostView
      title={title}
      description={description}
      thumbnail={thumbnail}
      chips={chips}
      level={level}
      componentStyle={componentStyle}
      hasSeparator={hasSeparator}
      header={header}
    />
  )
}

const CollapsedPostView = ({
  title,
  description,
  thumbnail,
  chips,
  level,
  componentStyle = 'card',
  hasSeparator = true,
  header
}: COLLAPSEDPOSTPROPS) => {
  return (
    <div className={`${style.collapsedPostContainer} ${style[componentStyle]}`}>
      {chips ? <Chips chips={chips.slice(0, 3)} color='lightMain' /> : null}
      {header ? (
        <div className={style.header}>
          <div className={style.avatar}>
            <Avatar
              size={'large'}
              renderItem={header.text ? header.text[0] : null}
            />
          </div>
          <p className={style.content}>
            <span className={style.author}>{header.text}</span>
            <span className={style.date}>{header.date}</span>
          </p>
        </div>
      ) : null}
      {/* */}

      {/*HE COMENTADO ESTO PARA INTEGRAR EL BLOQUE DE LOCKED CONTENT*/}
      <div className={style.textContent}>
        <p className={style.title}>{title}</p>
        <div className={style.description}>{parse(description)}</div>
      </div>
      {thumbnail === 'locked' ? (
        <LockedContent />
      ) : (
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
        ></div>
      )}
      <div className={style.terms}>
        <div className={style.footer}>redes</div>
      </div>
    </div>
  )
}
export default React.memo(CollapsedPost)
