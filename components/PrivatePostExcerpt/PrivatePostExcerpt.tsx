import Chips from 'components/Chips'
import style from './privatePostExcerpt.module.scss'
import parse from 'html-react-parser'
import React from 'react'
import { WpCat } from 'infrastructure/dto/course.dto'
import Avatar from 'components/Avatar'


export interface PRIVATEPOSTEXCERPTPROPS {
  title?: string
  description: string
  thumbnail?: string
  chips?: any
  level?: WpCat | any,
  componentStyle?: 'card' | 'simple' | 'column' | 'row' | any
  hasSeparator?: boolean,
  header?: {
    // avatar?: any,
    text?: string,
    date?: any //OJO al tipado debe ser Date
  }
}

/**
 * Función principal del componente de extracto del post
 * @param gridItems Listado de elementos para renderizar en el grid
 * @returns
 */

const fakeheader = {
  text: 'John Doe',
  date: '20 Feb 2022'
}

const PrivatePostExcerpt = ({
  title,
  description,
  thumbnail,
  chips,
  level,
  componentStyle,
  hasSeparator,
  header
}: PRIVATEPOSTEXCERPTPROPS) => {
  return <PrivatePostExcerptView title={title} description={description} thumbnail={thumbnail} chips={chips} level={level} componentStyle={componentStyle} hasSeparator={hasSeparator} header={header} />
}

const PrivatePostExcerptView = ({
  title,
  description,
  thumbnail,
  chips,
  level,
  componentStyle = 'card',
  hasSeparator = true,
  header = fakeheader
}: PRIVATEPOSTEXCERPTPROPS) => {
  return (
    <div className={`${style.postExcerptContainer} ${style[componentStyle]}`}>
      {chips ? <Chips chips={chips.slice(0, 3)} color='lightMain' /> : null}
      {header ? (
        <div className={style.header}>
          <div className={style.avatar}>
            <Avatar size={'large'} renderItem={header.text ? header.text[0] : null} />
          </div>
          <p className={style.content}><span className={style.author}>{header.text}</span><span className={style.date}>{header.date}</span></p>
        </div>
      ) : null}
      <div className={style.textContent}>
        <p className={style.title}>{title}</p>
        <div className={style.description}>
          {parse(description)}
        </div>
      </div>
      <div style={thumbnail ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundSize: '80px' }} className={style.imageContainer}>
      </div>
      <div className={style.terms}>
        <div className={style.footer}>
          redes
        </div>
      </div>
    </div>
  )
}
export default React.memo(PrivatePostExcerpt)
