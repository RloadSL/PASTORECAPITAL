import Chips from 'components/Chips'
import style from './collapsedPost.module.scss'
import parse from 'html-react-parser'
import React, { useState } from 'react'
import { WpCat } from 'infrastructure/dto/post.dto'
import Avatar from 'components/Avatar'
import LockedContent from 'components/LockedContent'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import SocialMediaButtons from 'components/SocialMediaButtons'
import { useRouter } from 'next/router'
import { WP_TERM } from 'infrastructure/dto/wp.dto'

export interface COLLAPSEDPOSTPROPS {
  title: string
  description: string
  lockedContent: boolean
  chips?: any
  metas?:any
  // isCollapsed: boolean
  level?: WP_TERM | any
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
  lockedContent = false,
  chips,
  level,
  componentStyle,
  hasSeparator,
  header,
  metas
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
  const [isCollapsed, setIsCollapsed] = useState(true)
  const renderCollapsedText = () => {
    setIsCollapsed(!isCollapsed)
  }

  const {asPath} = useRouter()
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
            <br/>
            {level && <span className={style.description}>Plan: {level.name}</span>}
          </p>
        </div>
      ) : null}
      {/* */}

      <div className={style.textContent}>
        <p className={style.title}>{title}</p>
        <div className={style.description}>
          {parse(description)}
          {/* {isCollapsed
            ? parse(description)
            : parse(limitTextLength(250, description))} */}
        </div>
       {/*  {!lockedContent && (
          <button
            className={style.seeMore}
            onClick={() => renderCollapsedText()}
          >
            {isCollapsed ? 'Ver menos' : 'Ver más'}
          </button>
        )} */}
      </div>
      {lockedContent && <LockedContent />}
      <div className={style.terms}>
        <div className={style.footer}><SocialMediaButtons title={title} description={description} url={asPath}/></div>
      </div>
    </div>
  )
}
export default React.memo(CollapsedPost)
