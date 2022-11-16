import Chips from 'components/Chips'
import style from './CollapsedPost.module.scss'
import parse from 'html-react-parser'
import React, { useState } from 'react'
import { WpCat } from 'infrastructure/dto/post.dto'
import Avatar from 'components/Avatar'
import LockedContent from 'components/LockedContent'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import SocialMediaButtons from 'components/SocialMediaButtons'

export interface COLLAPSEDPOSTPROPS {
  title?: string
  description: string
  lockedContent: boolean
  chips?: any
  // isCollapsed: boolean
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
  lockedContent = true,
  chips,
  level,
  componentStyle,
  hasSeparator,
  header
}: // isCollapsed
COLLAPSEDPOSTPROPS) => {
  return (
    <CollapsedPostView
      title={title}
      description={description}
      lockedContent={lockedContent}
      chips={chips}
      level={level}
      componentStyle={componentStyle}
      hasSeparator={hasSeparator}
      header={header}
      // isCollapsed={isCollapsed}
    />
  )
}

const CollapsedPostView = ({
  title,
  description,
  lockedContent,
  chips,
  level,
  componentStyle = 'card',
  hasSeparator = true,
  header
}: // isCollapsed
COLLAPSEDPOSTPROPS) => {
  const { limitTextLength } = useComponentUtils()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const renderCollapsedText = () => {
    setIsCollapsed(!isCollapsed)
  }

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

      <div className={style.textContent}>
        <p className={style.title}>{title}</p>
        <div className={style.description}>
          {isCollapsed
            ? parse(description)
            : parse(limitTextLength(250, description))}
        </div>
        {!lockedContent && (
          <button
            className={style.seeMore}
            onClick={() => renderCollapsedText()}
          >
            {isCollapsed ? 'Ver menos' : 'Ver más'}
          </button>
        )}
      </div>
      {lockedContent && <LockedContent />}
      <div className={style.terms}>
        {/* <div className={style.footer}><SocialMediaButtons/></div> */}
      </div>
    </div>
  )
}
export default React.memo(CollapsedPost)
